import { CajaService } from './caja.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
export declare class CajaController {
    private readonly cajaService;
    constructor(cajaService: CajaService);
    getCaja(): Promise<{}>;
    getSummary(from?: string, to?: string): Promise<{}>;
    getExpenses(from?: string, to?: string): Promise<{}>;
    addExpense(dto: CreateExpenseDto): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    removeExpense(id: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
