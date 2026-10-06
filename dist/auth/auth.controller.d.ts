import { CognitoBffService } from './cognito-bff.service.js';
declare class LoginDto {
    username: string;
    password: string;
}
declare class RefreshDto {
    refreshToken: string;
    username: string;
}
export declare class AuthController {
    private readonly cognitoBffService;
    constructor(cognitoBffService: CognitoBffService);
    login(dto: LoginDto): Promise<import("./cognito-bff.service.js").LoginResponse>;
    refresh(dto: RefreshDto): Promise<import("./cognito-bff.service.js").LoginResponse>;
}
export {};
