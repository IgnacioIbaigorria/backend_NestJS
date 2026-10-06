import { OnModuleInit } from '@nestjs/common';
export declare class AdminSeedService implements OnModuleInit {
    private readonly logger;
    private readonly client;
    private readonly userPoolId;
    private readonly adminUsername;
    private readonly adminPassword;
    private readonly forceReset;
    constructor();
    onModuleInit(): Promise<void>;
    private ensureAdminUserExists;
}
