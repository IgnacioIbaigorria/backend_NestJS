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

@Module({
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
export class AuthModule {}
