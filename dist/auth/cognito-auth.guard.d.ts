import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CognitoService } from './cognito.service.js';
import { Reflector } from '@nestjs/core';
export declare class CognitoAuthGuard implements CanActivate {
    private readonly cognitoService;
    private readonly reflector;
    constructor(cognitoService: CognitoService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
