import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminAddUserToGroupCommand,
  CreateGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);
  private readonly client: CognitoIdentityProviderClient;
  private readonly userPoolId: string;
  private readonly adminUsername: string;
  private readonly adminPassword: string;
  private readonly forceReset: boolean;

  constructor() {
    this.userPoolId = process.env.COGNITO_USER_POOL_ID ?? '';
    this.adminUsername = process.env.ADMIN_USERNAME ?? '';
    this.adminPassword = process.env.ADMIN_PASSWORD ?? '';
    this.forceReset = process.env.ADMIN_FORCE_RESET === 'true';

    if (!this.userPoolId) {
      throw new Error('COGNITO_USER_POOL_ID es obligatorio');
    }

    if (!this.adminUsername || !this.adminPassword) {
      throw new Error(
        'ADMIN_USERNAME y ADMIN_PASSWORD son obligatorios. Defínelos en tu archivo .env',
      );
    }

    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.ensureAdminUserExists();
    } catch (error) {
      this.logger.error(
        `Error en seed de admin: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    }
  }

  private async ensureAdminUserExists(): Promise<void> {
    let userExisted = false;

    try {
      await this.client.send(
        new AdminCreateUserCommand({
          UserPoolId: this.userPoolId,
          Username: this.adminUsername,
          MessageAction: 'SUPPRESS',
        }),
      );
      this.logger.log(`Usuario admin '${this.adminUsername}' creado exitosamente`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === 'UsernameExistsException'
      ) {
        userExisted = true;
        this.logger.log(`Usuario admin '${this.adminUsername}' ya existe`);
      } else {
        throw error;
      }
    }

    // Actualizar contraseña si es un usuario nuevo o si forceReset está activo
    if (!userExisted || this.forceReset) {
      await this.client.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: this.adminUsername,
          Password: this.adminPassword,
          Permanent: true,
        }),
      );
      this.logger.log(
        `Contraseña de '${this.adminUsername}' ${userExisted ? 'actualizada (force reset)' : 'establecida'}`,
      );
    }

    // Crear el grupo 'ADMIN' si no existe
    try {
      await this.client.send(
        new CreateGroupCommand({
          GroupName: 'ADMIN',
          UserPoolId: this.userPoolId,
          Description: 'Grupo de administradores del sistema',
        }),
      );
      this.logger.log(`Grupo 'ADMIN' creado exitosamente`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === 'GroupExistsException'
      ) {
        this.logger.log(`Grupo 'ADMIN' ya existe`);
      } else {
        this.logger.warn(
          `No se pudo crear el grupo 'ADMIN': ${error instanceof Error ? error.message : 'Error desconocido'}`,
        );
      }
    }

    // Asignar al grupo de administradores
    try {
      await this.client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: this.userPoolId,
          Username: this.adminUsername,
          GroupName: 'ADMIN',
        }),
      );
      this.logger.log(`Usuario '${this.adminUsername}' asignado al grupo 'ADMIN'`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === 'UserNotFoundException'
      ) {
        this.logger.warn(
          `No se pudo asignar el grupo: usuario '${this.adminUsername}' no encontrado`,
        );
      } else {
        this.logger.warn(
          `No se pudo asignar el grupo 'ADMIN': ${error instanceof Error ? error.message : 'Error desconocido'}`,
        );
      }
    }
  }
}
