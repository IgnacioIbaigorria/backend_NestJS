import { SalesService } from './sales.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(dto: CreateSaleDto): Promise<{
        payments: {
            id: string;
            createdAt: Date;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(productId?: string, from?: string, to?: string): Promise<{}>;
    getSummary(from?: string, to?: string): Promise<{}>;
    findOne(id: string): Promise<{}>;
}
