import { CreateUserDto } from './dto/create-user.dto.js';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        username?: string;
        sub?: string;
        status?: string;
        enabled?: boolean;
        createdAt?: Date;
        lastModifiedAt?: Date;
        attributes: Record<string, string>;
        roles: string[];
    }>;
    findAll(limit?: number, nextToken?: string): Promise<{
        users: {
            username?: string;
            sub?: string;
            status?: string;
            enabled?: boolean;
            createdAt?: Date;
            lastModifiedAt?: Date;
            attributes: Record<string, string>;
            roles: string[];
        }[];
        nextToken: string | undefined;
    }>;
    findOne(username: string): Promise<{
        username?: string;
        sub?: string;
        status?: string;
        enabled?: boolean;
        createdAt?: Date;
        lastModifiedAt?: Date;
        attributes: Record<string, string>;
        roles: string[];
    }>;
    update(username: string, dto: UpdateUserDto): Promise<{
        username?: string;
        sub?: string;
        status?: string;
        enabled?: boolean;
        createdAt?: Date;
        lastModifiedAt?: Date;
        attributes: Record<string, string>;
        roles: string[];
    }>;
    resetPassword(username: string, dto: ResetUserPasswordDto): Promise<{
        message: string;
    }>;
    remove(username: string): Promise<{
        message: string;
    }>;
}
