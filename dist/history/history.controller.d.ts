import { HistoryService } from './history.service.js';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    findAll(productId?: string, field?: string): Promise<{}>;
    findOne(id: string): Promise<{}>;
}
