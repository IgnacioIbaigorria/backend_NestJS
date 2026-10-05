import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CognitoService } from './cognito.service.js';
export declare class CognitoAuthGuard implements CanActivate {
    private readonly cognitoService;
    constructor(cognitoService: CognitoService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
