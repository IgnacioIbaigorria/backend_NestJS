export declare const COGNITO_ROLES: readonly ["ADMIN", "MANAGER", "SELLER", "INVENTORY_MANAGER", "AUDITOR", "GUEST"];
export declare class CreateUserDto {
    username: string;
    password: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    roles?: string[];
}
