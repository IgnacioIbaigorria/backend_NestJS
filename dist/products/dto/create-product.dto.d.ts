export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    costPrice?: number;
    stock?: number;
    minStock?: number;
    categoryId?: string;
    tagIds?: string[];
}
