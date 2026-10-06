import { CreateUserDto } from './dto/create-user.dto.js';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
type UserResponse = {
    username?: string;
    sub?: string;
    status?: string;
    enabled?: boolean;
    createdAt?: Date;
    lastModifiedAt?: Date;
    attributes: Record<string, string>;
    roles: string[];
};
export declare class UsersService {
    private readonly client;
    private readonly userPoolId;
    constructor();
    create(dto: CreateUserDto): Promise<UserResponse>;
    findAll(limit?: number, paginationToken?: string): Promise<{
        users: UserResponse[];
        nextToken: string | undefined;
    }>;
    findOne(username: string): Promise<UserResponse>;
    update(username: string, dto: UpdateUserDto): Promise<UserResponse>;
    resetPassword(username: string, dto: ResetUserPasswordDto): Promise<{
        message: string;
    }>;
    remove(username: string): Promise<{
        message: string;
    }>;
    private toAttributes;
    private toResponseWithRoles;
    private replaceRoles;
    private toResponse;
    private handleCognitoError;
}
export {};
