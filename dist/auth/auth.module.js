var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuard } from './cognito-auth.guard.js';
import { CognitoService } from './cognito.service.js';
import { CognitoBffService } from './cognito-bff.service.js';
import { RolesGuard } from './roles.guard.js';
import { AuthController } from './auth.controller.js';
import { AdminSeedService } from './admin-seed.service.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        controllers: [AuthController, UsersController],
        providers: [
            CognitoService,
            CognitoBffService,
            CognitoAuthGuard,
            RolesGuard,
            AdminSeedService,
            UsersService,
            {
                provide: APP_GUARD,
                useExisting: CognitoAuthGuard,
            },
            {
                provide: APP_GUARD,
                useExisting: RolesGuard,
            },
        ],
        exports: [CognitoService, CognitoBffService],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map