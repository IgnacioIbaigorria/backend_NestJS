import type { CognitoUser } from './auth.types.js';
export declare class CognitoService {
    private readonly verifier;
    constructor();
    verifyAccessToken(token: string): Promise<CognitoUser>;
}
