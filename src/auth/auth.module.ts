import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuard } from './cognito-auth.guard.js';
import { CognitoService } from './cognito.service.js';
import { RolesGuard } from './roles.guard.js';

@Module({
  providers: [
    CognitoService,
    CognitoAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useExisting: CognitoAuthGuard,
    },
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
  ],
  exports: [CognitoService],
})
export class AuthModule {}
