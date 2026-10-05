import { ReposicionService } from './reposicion.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';
export declare class ReposicionController {
    private readonly reposicionService;
    constructor(reposicionService: ReposicionService);
    create(dto: CreateReposicionDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        supplier: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    findAll(productId?: string): Promise<{}>;
    findOne(id: string): Promise<{}>;
}
