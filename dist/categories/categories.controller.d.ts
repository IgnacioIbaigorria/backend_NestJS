import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
