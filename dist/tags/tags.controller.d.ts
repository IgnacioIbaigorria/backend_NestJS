import { TagsService } from './tags.service.js';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(dto: CreateTagDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, dto: UpdateTagDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
}
