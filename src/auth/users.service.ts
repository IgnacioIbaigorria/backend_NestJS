import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  TooManyRequestsException,
} from '@nestjs/common';
import {
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
  type AttributeType,
  type UserType,
} from '@aws-sdk/client-cognito-identity-provider';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

type UserResponse = {
  username?: string;
  sub?: string;
  status?: string;
  enabled?: boolean;
  createdAt?: Date;
  lastModifiedAt?: Date;
  attributes: Record<string, string>;
};

type CognitoUserLike = {
  Username?: string;
  Attributes?: AttributeType[];
  UserAttributes?: AttributeType[];
  Enabled?: boolean;
  UserStatus?: string;
  UserCreateDate?: Date;
  UserLastModifiedDate?: Date;
};

@Injectable()
export class UsersService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly userPoolId: string;

  constructor() {
    this.userPoolId = process.env.COGNITO_USER_POOL_ID ?? '';
    if (!this.userPoolId) {
      throw new Error('COGNITO_USER_POOL_ID es obligatorio');
    }

    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }

  async create(dto: CreateUserDto): Promise<UserResponse> {
    try {
      const created = await this.client.send(
        new AdminCreateUserCommand({
          UserPoolId: this.userPoolId,
          Username: dto.username,
          TemporaryPassword: dto.password,
          MessageAction: 'SUPPRESS',
          UserAttributes: this.toAttributes(dto),
        }),
      );

      try {
        await this.client.send(
          new AdminSetUserPasswordCommand({
            UserPoolId: this.userPoolId,
            Username: dto.username,
            Password: dto.password,
            Permanent: true,
          }),
        );
      } catch (error) {
        await this.client.send(
          new AdminDeleteUserCommand({
            UserPoolId: this.userPoolId,
            Username: dto.username,
          }),
        );
        throw error;
      }

      return this.toResponse(created.User);
    } catch (error) {
      this.handleCognitoError(error, dto.username);
    }
  }

  async findAll(limit = 60, paginationToken?: string) {
    try {
      const response = await this.client.send(
        new ListUsersCommand({
          UserPoolId: this.userPoolId,
          Limit: limit,
          PaginationToken: paginationToken,
        }),
      );

      return {
        users: (response.Users ?? []).map((user) => this.toResponse(user)),
        nextToken: response.PaginationToken,
      };
    } catch (error) {
      this.handleCognitoError(error);
    }
  }

  async findOne(username: string): Promise<UserResponse> {
    try {
      const response = await this.client.send(
        new AdminGetUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
        }),
      );

      return this.toResponse(response);
    } catch (error) {
      this.handleCognitoError(error, username);
    }
  }

  async update(username: string, dto: UpdateUserDto): Promise<UserResponse> {
    try {
      if (dto.email || dto.name || dto.phoneNumber) {
        await this.client.send(
          new AdminUpdateUserAttributesCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            UserAttributes: this.toAttributes(dto),
          }),
        );
      }

      if (dto.enabled !== undefined) {
        if (dto.enabled) {
          await this.client.send(
            new AdminEnableUserCommand({
              UserPoolId: this.userPoolId,
              Username: username,
            }),
          );
        } else {
          await this.client.send(
            new AdminDisableUserCommand({
              UserPoolId: this.userPoolId,
              Username: username,
            }),
          );
        }
      }

      return this.findOne(username);
    } catch (error) {
      this.handleCognitoError(error, username);
    }
  }

  async resetPassword(
    username: string,
    dto: ResetUserPasswordDto,
  ): Promise<{ message: string }> {
    try {
      await this.client.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          Password: dto.password,
          Permanent: true,
        }),
      );
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      this.handleCognitoError(error, username);
    }
  }

  async remove(username: string): Promise<{ message: string }> {
    try {
      await this.client.send(
        new AdminDeleteUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
        }),
      );
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      this.handleCognitoError(error, username);
    }
  }

  private toAttributes(
    value: CreateUserDto | UpdateUserDto,
  ): AttributeType[] {
    return [
      value.email ? { Name: 'email', Value: value.email } : undefined,
      value.name ? { Name: 'name', Value: value.name } : undefined,
      value.phoneNumber
        ? { Name: 'phone_number', Value: value.phoneNumber }
        : undefined,
    ].filter((attribute): attribute is AttributeType => attribute !== undefined);
  }

  private toResponse(
    user: UserType | CognitoUserLike,
  ): UserResponse {
    const attributes = Object.fromEntries(
      (user.Attributes ?? user.UserAttributes ?? [])
        .filter(
          (attribute): attribute is AttributeType & { Value: string } =>
            Boolean(attribute.Name && attribute.Value),
        )
        .map((attribute) => [attribute.Name, attribute.Value]),
    );

    return {
      username: user.Username,
      sub: attributes.sub,
      status: user.UserStatus,
      enabled: user.Enabled,
      createdAt: user.UserCreateDate,
      lastModifiedAt: user.UserLastModifiedDate,
      attributes,
    };
  }

  private handleCognitoError(error: unknown, username?: string): never {
    const name = error instanceof Error ? error.name : '';
    if (name === 'UsernameExistsException') {
      throw new ConflictException(`El usuario '${username}' ya existe`);
    }
    if (name === 'UserNotFoundException') {
      throw new NotFoundException(`El usuario '${username}' no existe`);
    }
    if (name === 'InvalidPasswordException') {
      throw new BadRequestException(
        'La contraseña no cumple la política configurada en Cognito',
      );
    }
    if (
      name === 'TooManyRequestsException' ||
      name === 'LimitExceededException'
    ) {
      throw new TooManyRequestsException(
        'Cognito ha limitado temporalmente la operación',
      );
    }
    if (name === 'InvalidParameterException') {
      throw new BadRequestException(
        'Los datos del usuario no son válidos para Cognito',
      );
    }
    if (name === 'NotAuthorizedException') {
      throw new ForbiddenException('La operación no está autorizada en Cognito');
    }
    throw error;
  }
}
