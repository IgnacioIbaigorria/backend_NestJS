var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, HttpException, HttpStatus, } from '@nestjs/common';
import { AdminCreateUserCommand, AdminDeleteUserCommand, AdminDisableUserCommand, AdminEnableUserCommand, AdminGetUserCommand, AdminAddUserToGroupCommand, AdminListGroupsForUserCommand, AdminRemoveUserFromGroupCommand, AdminSetUserPasswordCommand, AdminUpdateUserAttributesCommand, CognitoIdentityProviderClient, ListUsersCommand, } from '@aws-sdk/client-cognito-identity-provider';
let UsersService = class UsersService {
    client;
    userPoolId;
    constructor() {
        this.userPoolId = process.env.COGNITO_USER_POOL_ID ?? '';
        if (!this.userPoolId) {
            throw new Error('COGNITO_USER_POOL_ID es obligatorio');
        }
        this.client = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION ?? 'us-east-1',
        });
    }
    async create(dto) {
        let userCreated = false;
        try {
            await this.client.send(new AdminCreateUserCommand({
                UserPoolId: this.userPoolId,
                Username: dto.username,
                TemporaryPassword: dto.password,
                MessageAction: 'SUPPRESS',
                UserAttributes: this.toAttributes(dto),
            }));
            userCreated = true;
            try {
                await this.client.send(new AdminSetUserPasswordCommand({
                    UserPoolId: this.userPoolId,
                    Username: dto.username,
                    Password: dto.password,
                    Permanent: true,
                }));
            }
            catch (error) {
                await this.client.send(new AdminDeleteUserCommand({
                    UserPoolId: this.userPoolId,
                    Username: dto.username,
                }));
                userCreated = false;
                throw error;
            }
            await this.replaceRoles(dto.username, dto.roles ?? []);
            return this.findOne(dto.username);
        }
        catch (error) {
            if (userCreated) {
                await this.client.send(new AdminDeleteUserCommand({
                    UserPoolId: this.userPoolId,
                    Username: dto.username,
                }));
            }
            this.handleCognitoError(error, dto.username);
        }
    }
    async findAll(limit = 60, paginationToken) {
        try {
            const response = await this.client.send(new ListUsersCommand({
                UserPoolId: this.userPoolId,
                Limit: limit,
                PaginationToken: paginationToken,
            }));
            return {
                users: await Promise.all((response.Users ?? []).map((user) => this.toResponseWithRoles(user))),
                nextToken: response.PaginationToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async findOne(username) {
        try {
            const response = await this.client.send(new AdminGetUserCommand({
                UserPoolId: this.userPoolId,
                Username: username,
            }));
            return this.toResponseWithRoles(response);
        }
        catch (error) {
            this.handleCognitoError(error, username);
        }
    }
    async update(username, dto) {
        try {
            if (dto.email || dto.name || dto.phoneNumber) {
                await this.client.send(new AdminUpdateUserAttributesCommand({
                    UserPoolId: this.userPoolId,
                    Username: username,
                    UserAttributes: this.toAttributes(dto),
                }));
            }
            if (dto.enabled !== undefined) {
                if (dto.enabled) {
                    await this.client.send(new AdminEnableUserCommand({
                        UserPoolId: this.userPoolId,
                        Username: username,
                    }));
                }
                else {
                    await this.client.send(new AdminDisableUserCommand({
                        UserPoolId: this.userPoolId,
                        Username: username,
                    }));
                }
            }
            if (dto.roles !== undefined) {
                await this.replaceRoles(username, dto.roles);
            }
            return this.findOne(username);
        }
        catch (error) {
            this.handleCognitoError(error, username);
        }
    }
    async resetPassword(username, dto) {
        try {
            await this.client.send(new AdminSetUserPasswordCommand({
                UserPoolId: this.userPoolId,
                Username: username,
                Password: dto.password,
                Permanent: true,
            }));
            return { message: 'Contraseña actualizada correctamente' };
        }
        catch (error) {
            this.handleCognitoError(error, username);
        }
    }
    async remove(username) {
        try {
            await this.client.send(new AdminDeleteUserCommand({
                UserPoolId: this.userPoolId,
                Username: username,
            }));
            return { message: 'Usuario eliminado correctamente' };
        }
        catch (error) {
            this.handleCognitoError(error, username);
        }
    }
    toAttributes(value) {
        const attributes = [];
        if (value.email)
            attributes.push({ Name: 'email', Value: value.email });
        if (value.name)
            attributes.push({ Name: 'name', Value: value.name });
        if (value.phoneNumber) {
            attributes.push({ Name: 'phone_number', Value: value.phoneNumber });
        }
        return attributes;
    }
    async toResponseWithRoles(user) {
        const response = this.toResponse(user);
        if (!response.username) {
            return response;
        }
        const groups = await this.client.send(new AdminListGroupsForUserCommand({
            UserPoolId: this.userPoolId,
            Username: response.username,
        }));
        response.roles = (groups.Groups ?? [])
            .map((group) => group.GroupName)
            .filter((role) => Boolean(role));
        return response;
    }
    async replaceRoles(username, roles) {
        const current = await this.client.send(new AdminListGroupsForUserCommand({
            UserPoolId: this.userPoolId,
            Username: username,
        }));
        const currentRoles = (current.Groups ?? [])
            .map((group) => group.GroupName)
            .filter((role) => Boolean(role));
        await Promise.all(currentRoles
            .filter((role) => !roles.includes(role))
            .map((role) => this.client.send(new AdminRemoveUserFromGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: role,
        }))));
        await Promise.all(roles
            .filter((role) => !currentRoles.includes(role))
            .map((role) => this.client.send(new AdminAddUserToGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: role,
        }))));
    }
    toResponse(user) {
        const rawAttributes = 'UserAttributes' in user ? user.UserAttributes : user.Attributes;
        const attributes = Object.fromEntries((rawAttributes ?? [])
            .filter((attribute) => Boolean(attribute.Name && attribute.Value))
            .map((attribute) => [attribute.Name, attribute.Value]));
        return {
            username: user.Username,
            sub: attributes.sub,
            status: user.UserStatus,
            enabled: user.Enabled,
            createdAt: user.UserCreateDate,
            lastModifiedAt: user.UserLastModifiedDate,
            attributes,
            roles: [],
        };
    }
    handleCognitoError(error, username) {
        const name = error instanceof Error ? error.name : '';
        if (name === 'UsernameExistsException') {
            throw new ConflictException(`El usuario '${username}' ya existe`);
        }
        if (name === 'UserNotFoundException') {
            throw new NotFoundException(`El usuario '${username}' no existe`);
        }
        if (name === 'InvalidPasswordException') {
            throw new BadRequestException('La contraseña no cumple la política configurada en Cognito');
        }
        if (name === 'TooManyRequestsException' ||
            name === 'LimitExceededException') {
            throw new HttpException('Cognito ha limitado temporalmente la operación', HttpStatus.TOO_MANY_REQUESTS);
        }
        if (name === 'InvalidParameterException') {
            throw new BadRequestException('Los datos del usuario no son válidos para Cognito');
        }
        if (name === 'NotAuthorizedException') {
            throw new ForbiddenException('La operación no está autorizada en Cognito');
        }
        throw error;
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map