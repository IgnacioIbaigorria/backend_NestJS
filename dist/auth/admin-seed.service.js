var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AdminSeedService_1;
import { Injectable, Logger } from '@nestjs/common';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand, AdminAddUserToGroupCommand, CreateGroupCommand, } from '@aws-sdk/client-cognito-identity-provider';
let AdminSeedService = AdminSeedService_1 = class AdminSeedService {
    logger = new Logger(AdminSeedService_1.name);
    client;
    userPoolId;
    adminUsername;
    adminPassword;
    forceReset;
    constructor() {
        this.userPoolId = process.env.COGNITO_USER_POOL_ID ?? '';
        this.adminUsername = process.env.ADMIN_USERNAME ?? '';
        this.adminPassword = process.env.ADMIN_PASSWORD ?? '';
        this.forceReset = process.env.ADMIN_FORCE_RESET === 'true';
        if (!this.userPoolId) {
            throw new Error('COGNITO_USER_POOL_ID es obligatorio');
        }
        if (!this.adminUsername || !this.adminPassword) {
            throw new Error('ADMIN_USERNAME y ADMIN_PASSWORD son obligatorios. Defínelos en tu archivo .env');
        }
        this.client = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION ?? 'us-east-1',
        });
    }
    async onModuleInit() {
        try {
            await this.ensureAdminUserExists();
        }
        catch (error) {
            this.logger.error(`Error en seed de admin: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }
    async ensureAdminUserExists() {
        let userExisted = false;
        try {
            await this.client.send(new AdminCreateUserCommand({
                UserPoolId: this.userPoolId,
                Username: this.adminUsername,
                MessageAction: 'SUPPRESS',
            }));
            this.logger.log(`Usuario admin '${this.adminUsername}' creado exitosamente`);
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === 'UsernameExistsException') {
                userExisted = true;
                this.logger.log(`Usuario admin '${this.adminUsername}' ya existe`);
            }
            else {
                throw error;
            }
        }
        if (!userExisted || this.forceReset) {
            await this.client.send(new AdminSetUserPasswordCommand({
                UserPoolId: this.userPoolId,
                Username: this.adminUsername,
                Password: this.adminPassword,
                Permanent: true,
            }));
            this.logger.log(`Contraseña de '${this.adminUsername}' ${userExisted ? 'actualizada (force reset)' : 'establecida'}`);
        }
        try {
            await this.client.send(new CreateGroupCommand({
                GroupName: 'admin',
                UserPoolId: this.userPoolId,
                Description: 'Grupo de administradores del sistema',
            }));
            this.logger.log(`Grupo 'admin' creado exitosamente`);
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === 'GroupExistsException') {
                this.logger.log(`Grupo 'admin' ya existe`);
            }
            else {
                this.logger.warn(`No se pudo crear el grupo 'admin': ${error instanceof Error ? error.message : 'Error desconocido'}`);
            }
        }
        try {
            await this.client.send(new AdminAddUserToGroupCommand({
                UserPoolId: this.userPoolId,
                Username: this.adminUsername,
                GroupName: 'admin',
            }));
            this.logger.log(`Usuario '${this.adminUsername}' asignado al grupo 'admin'`);
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === 'UserNotFoundException') {
                this.logger.warn(`No se pudo asignar el grupo: usuario '${this.adminUsername}' no encontrado`);
            }
            else {
                this.logger.warn(`No se pudo asignar el grupo 'admin': ${error instanceof Error ? error.message : 'Error desconocido'}`);
            }
        }
    }
};
AdminSeedService = AdminSeedService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AdminSeedService);
export { AdminSeedService };
//# sourceMappingURL=admin-seed.service.js.map