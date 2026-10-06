export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expiresIn: number;
    tokenType: string;
}
export declare class CognitoBffService {
    private readonly logger;
    private readonly client;
    private readonly clientId;
    private readonly clientSecret;
    constructor();
    private computeSecretHash;
    login(username: string, password: string): Promise<LoginResponse>;
    refreshToken(refreshToken: string, username: string): Promise<LoginResponse>;
}
