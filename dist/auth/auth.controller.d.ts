import type { Request, Response } from 'express';
import { CognitoBffService } from './cognito-bff.service.js';
declare class LoginDto {
    username: string;
    password: string;
}
declare class RefreshDto {
    refreshToken?: string;
    username: string;
}
export declare class AuthController {
    private readonly cognitoBffService;
    constructor(cognitoBffService: CognitoBffService);
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        expiresIn: number;
        tokenType: string;
    }>;
    refresh(dto: RefreshDto, req: Request, res: Response): Promise<{
        accessToken: string;
        expiresIn: number;
        tokenType: string;
    }>;
    logout(res: Response): {
        ok: boolean;
    };
}
export {};
