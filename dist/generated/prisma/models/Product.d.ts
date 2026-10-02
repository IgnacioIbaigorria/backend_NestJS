import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    price: runtime.Decimal | null;
    costPrice: runtime.Decimal | null;
    stock: number | null;
    minStock: number | null;
};
export type ProductSumAggregateOutputType = {
    price: runtime.Decimal | null;
    costPrice: runtime.Decimal | null;
    stock: number | null;
    minStock: number | null;
};
export type ProductMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    costPrice: runtime.Decimal | null;
    stock: number | null;
    minStock: number | null;
    categoryId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    costPrice: runtime.Decimal | null;
    stock: number | null;
    minStock: number | null;
    categoryId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    price: number;
    costPrice: number;
    stock: number;
    minStock: number;
    categoryId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    price?: true;
    costPrice?: true;
    stock?: true;
    minStock?: true;
};
export type ProductSumAggregateInputType = {
    price?: true;
    costPrice?: true;
    stock?: true;
    minStock?: true;
};
export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    costPrice?: true;
    stock?: true;
    minStock?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    costPrice?: true;
    stock?: true;
    minStock?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    costPrice?: true;
    stock?: true;
    minStock?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type ProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput | Prisma.ProductOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    price: runtime.Decimal;
    costPrice: runtime.Decimal;
    stock: number;
    minStock: number;
    categoryId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type ProductWhereInput = {
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    id?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFilter<"Product"> | number;
    minStock?: Prisma.IntFilter<"Product"> | number;
    categoryId?: Prisma.StringNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    tags?: Prisma.TagListRelationFilter;
    sales?: Prisma.SaleListRelationFilter;
    reposiciones?: Prisma.ReposicionListRelationFilter;
    history?: Prisma.ProductHistoryListRelationFilter;
};
export type ProductOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    tags?: Prisma.TagOrderByRelationAggregateInput;
    sales?: Prisma.SaleOrderByRelationAggregateInput;
    reposiciones?: Prisma.ReposicionOrderByRelationAggregateInput;
    history?: Prisma.ProductHistoryOrderByRelationAggregateInput;
};
export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFilter<"Product"> | number;
    minStock?: Prisma.IntFilter<"Product"> | number;
    categoryId?: Prisma.StringNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    tags?: Prisma.TagListRelationFilter;
    sales?: Prisma.SaleListRelationFilter;
    reposiciones?: Prisma.ReposicionListRelationFilter;
    history?: Prisma.ProductHistoryListRelationFilter;
}, "id" | "name">;
export type ProductOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductCountOrderByAggregateInput;
    _avg?: Prisma.ProductAvgOrderByAggregateInput;
    _max?: Prisma.ProductMaxOrderByAggregateInput;
    _min?: Prisma.ProductMinOrderByAggregateInput;
    _sum?: Prisma.ProductSumOrderByAggregateInput;
};
export type ProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    price?: Prisma.DecimalWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntWithAggregatesFilter<"Product"> | number;
    minStock?: Prisma.IntWithAggregatesFilter<"Product"> | number;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
};
export type ProductCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    tags?: Prisma.TagCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagUncheckedCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionUncheckedCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput;
    tags?: Prisma.TagUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUncheckedUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUncheckedUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductListRelationFilter = {
    every?: Prisma.ProductWhereInput;
    some?: Prisma.ProductWhereInput;
    none?: Prisma.ProductWhereInput;
};
export type ProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
};
export type ProductMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    costPrice?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    minStock?: Prisma.SortOrder;
};
export type ProductScalarRelationFilter = {
    is?: Prisma.ProductWhereInput;
    isNot?: Prisma.ProductWhereInput;
};
export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput> | Prisma.ProductCreateWithoutCategoryInput[] | Prisma.ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoryInput | Prisma.ProductCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductCreateNestedManyWithoutTagsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput> | Prisma.ProductCreateWithoutTagsInput[] | Prisma.ProductUncheckedCreateWithoutTagsInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutTagsInput | Prisma.ProductCreateOrConnectWithoutTagsInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutTagsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput> | Prisma.ProductCreateWithoutTagsInput[] | Prisma.ProductUncheckedCreateWithoutTagsInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutTagsInput | Prisma.ProductCreateOrConnectWithoutTagsInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutTagsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput> | Prisma.ProductCreateWithoutTagsInput[] | Prisma.ProductUncheckedCreateWithoutTagsInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutTagsInput | Prisma.ProductCreateOrConnectWithoutTagsInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutTagsInput | Prisma.ProductUpsertWithWhereUniqueWithoutTagsInput[];
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutTagsInput | Prisma.ProductUpdateWithWhereUniqueWithoutTagsInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutTagsInput | Prisma.ProductUpdateManyWithWhereWithoutTagsInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput> | Prisma.ProductCreateWithoutTagsInput[] | Prisma.ProductUncheckedCreateWithoutTagsInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutTagsInput | Prisma.ProductCreateOrConnectWithoutTagsInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutTagsInput | Prisma.ProductUpsertWithWhereUniqueWithoutTagsInput[];
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutTagsInput | Prisma.ProductUpdateWithWhereUniqueWithoutTagsInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutTagsInput | Prisma.ProductUpdateManyWithWhereWithoutTagsInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ProductCreateNestedOneWithoutSalesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSalesInput, Prisma.ProductUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSalesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutSalesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSalesInput, Prisma.ProductUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSalesInput;
    upsert?: Prisma.ProductUpsertWithoutSalesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutSalesInput, Prisma.ProductUpdateWithoutSalesInput>, Prisma.ProductUncheckedUpdateWithoutSalesInput>;
};
export type ProductCreateNestedOneWithoutReposicionesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutReposicionesInput, Prisma.ProductUncheckedCreateWithoutReposicionesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutReposicionesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutReposicionesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutReposicionesInput, Prisma.ProductUncheckedCreateWithoutReposicionesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutReposicionesInput;
    upsert?: Prisma.ProductUpsertWithoutReposicionesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutReposicionesInput, Prisma.ProductUpdateWithoutReposicionesInput>, Prisma.ProductUncheckedUpdateWithoutReposicionesInput>;
};
export type ProductCreateNestedOneWithoutHistoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutHistoryInput, Prisma.ProductUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutHistoryInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutHistoryInput, Prisma.ProductUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutHistoryInput;
    upsert?: Prisma.ProductUpsertWithoutHistoryInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutHistoryInput, Prisma.ProductUpdateWithoutHistoryInput>, Prisma.ProductUncheckedUpdateWithoutHistoryInput>;
};
export type ProductCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagUncheckedCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionUncheckedCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput>;
};
export type ProductCreateManyCategoryInputEnvelope = {
    data: Prisma.ProductCreateManyCategoryInput | Prisma.ProductCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutCategoryInput, Prisma.ProductUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoryInput, Prisma.ProductUncheckedCreateWithoutCategoryInput>;
};
export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutCategoryInput, Prisma.ProductUncheckedUpdateWithoutCategoryInput>;
};
export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutCategoryInput>;
};
export type ProductScalarWhereInput = {
    AND?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    OR?: Prisma.ProductScalarWhereInput[];
    NOT?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    id?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFilter<"Product"> | number;
    minStock?: Prisma.IntFilter<"Product"> | number;
    categoryId?: Prisma.StringNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
};
export type ProductCreateWithoutTagsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    sales?: Prisma.SaleCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutTagsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionUncheckedCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutTagsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput>;
};
export type ProductUpsertWithWhereUniqueWithoutTagsInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutTagsInput, Prisma.ProductUncheckedUpdateWithoutTagsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutTagsInput, Prisma.ProductUncheckedCreateWithoutTagsInput>;
};
export type ProductUpdateWithWhereUniqueWithoutTagsInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutTagsInput, Prisma.ProductUncheckedUpdateWithoutTagsInput>;
};
export type ProductUpdateManyWithWhereWithoutTagsInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutTagsInput>;
};
export type ProductCreateWithoutSalesInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    tags?: Prisma.TagCreateNestedManyWithoutProductsInput;
    reposiciones?: Prisma.ReposicionCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutSalesInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagUncheckedCreateNestedManyWithoutProductsInput;
    reposiciones?: Prisma.ReposicionUncheckedCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutSalesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSalesInput, Prisma.ProductUncheckedCreateWithoutSalesInput>;
};
export type ProductUpsertWithoutSalesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutSalesInput, Prisma.ProductUncheckedUpdateWithoutSalesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSalesInput, Prisma.ProductUncheckedCreateWithoutSalesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutSalesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutSalesInput, Prisma.ProductUncheckedUpdateWithoutSalesInput>;
};
export type ProductUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput;
    tags?: Prisma.TagUpdateManyWithoutProductsNestedInput;
    reposiciones?: Prisma.ReposicionUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUncheckedUpdateManyWithoutProductsNestedInput;
    reposiciones?: Prisma.ReposicionUncheckedUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutReposicionesInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    tags?: Prisma.TagCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutReposicionesInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagUncheckedCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutProductInput;
    history?: Prisma.ProductHistoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutReposicionesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutReposicionesInput, Prisma.ProductUncheckedCreateWithoutReposicionesInput>;
};
export type ProductUpsertWithoutReposicionesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutReposicionesInput, Prisma.ProductUncheckedUpdateWithoutReposicionesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutReposicionesInput, Prisma.ProductUncheckedCreateWithoutReposicionesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutReposicionesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutReposicionesInput, Prisma.ProductUncheckedUpdateWithoutReposicionesInput>;
};
export type ProductUpdateWithoutReposicionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput;
    tags?: Prisma.TagUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutReposicionesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUncheckedUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutHistoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutProductsInput;
    tags?: Prisma.TagCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutHistoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    categoryId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tags?: Prisma.TagUncheckedCreateNestedManyWithoutProductsInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutProductInput;
    reposiciones?: Prisma.ReposicionUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutHistoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutHistoryInput, Prisma.ProductUncheckedCreateWithoutHistoryInput>;
};
export type ProductUpsertWithoutHistoryInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutHistoryInput, Prisma.ProductUncheckedUpdateWithoutHistoryInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutHistoryInput, Prisma.ProductUncheckedCreateWithoutHistoryInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutHistoryInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutHistoryInput, Prisma.ProductUncheckedUpdateWithoutHistoryInput>;
};
export type ProductUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput;
    tags?: Prisma.TagUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUncheckedUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: number;
    minStock?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tags?: Prisma.TagUncheckedUpdateManyWithoutProductsNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUncheckedUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutProductsNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutProductNestedInput;
    reposiciones?: Prisma.ReposicionUncheckedUpdateManyWithoutProductNestedInput;
    history?: Prisma.ProductHistoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    costPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStock?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCountOutputType = {
    tags: number;
    sales: number;
    reposiciones: number;
    history: number;
};
export type ProductCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tags?: boolean | ProductCountOutputTypeCountTagsArgs;
    sales?: boolean | ProductCountOutputTypeCountSalesArgs;
    reposiciones?: boolean | ProductCountOutputTypeCountReposicionesArgs;
    history?: boolean | ProductCountOutputTypeCountHistoryArgs;
};
export type ProductCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductCountOutputTypeCountTagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
};
export type ProductCountOutputTypeCountSalesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
};
export type ProductCountOutputTypeCountReposicionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReposicionWhereInput;
};
export type ProductCountOutputTypeCountHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductHistoryWhereInput;
};
export type ProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    costPrice?: boolean;
    stock?: boolean;
    minStock?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
    tags?: boolean | Prisma.Product$tagsArgs<ExtArgs>;
    sales?: boolean | Prisma.Product$salesArgs<ExtArgs>;
    reposiciones?: boolean | Prisma.Product$reposicionesArgs<ExtArgs>;
    history?: boolean | Prisma.Product$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    costPrice?: boolean;
    stock?: boolean;
    minStock?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    costPrice?: boolean;
    stock?: boolean;
    minStock?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    costPrice?: boolean;
    stock?: boolean;
    minStock?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "price" | "costPrice" | "stock" | "minStock" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>;
export type ProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
    tags?: boolean | Prisma.Product$tagsArgs<ExtArgs>;
    sales?: boolean | Prisma.Product$salesArgs<ExtArgs>;
    reposiciones?: boolean | Prisma.Product$reposicionesArgs<ExtArgs>;
    history?: boolean | Prisma.Product$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
};
export type ProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Product$categoryArgs<ExtArgs>;
};
export type $ProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Product";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs> | null;
        tags: Prisma.$TagPayload<ExtArgs>[];
        sales: Prisma.$SalePayload<ExtArgs>[];
        reposiciones: Prisma.$ReposicionPayload<ExtArgs>[];
        history: Prisma.$ProductHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        price: runtime.Decimal;
        costPrice: runtime.Decimal;
        stock: number;
        minStock: number;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPayload, S>;
export type ProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface ProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Product'];
        meta: {
            name: 'Product';
        };
    };
    findUnique<T extends ProductFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductFindManyArgs>(args?: Prisma.SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCreateArgs>(args: Prisma.SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductDeleteArgs>(args: Prisma.SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductUpdateArgs>(args: Prisma.SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductUpsertArgs>(args: Prisma.SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCountArgs>(args?: Prisma.Subset<T, ProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends ProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductFieldRefs;
}
export interface Prisma__ProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.Product$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$categoryArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    tags<T extends Prisma.Product$tagsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sales<T extends Prisma.Product$salesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$salesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reposiciones<T extends Prisma.Product$reposicionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$reposicionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    history<T extends Prisma.Product$historyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$historyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductFieldRefs {
    readonly id: Prisma.FieldRef<"Product", 'String'>;
    readonly name: Prisma.FieldRef<"Product", 'String'>;
    readonly description: Prisma.FieldRef<"Product", 'String'>;
    readonly price: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly costPrice: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly stock: Prisma.FieldRef<"Product", 'Int'>;
    readonly minStock: Prisma.FieldRef<"Product", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"Product", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Product", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Product", 'DateTime'>;
}
export type ProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
};
export type ProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
    include?: Prisma.ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
};
export type ProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type Product$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type Product$tagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type Product$salesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SaleSelect<ExtArgs> | null;
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
export type Product$reposicionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    where?: Prisma.ReposicionWhereInput;
    orderBy?: Prisma.ReposicionOrderByWithRelationInput | Prisma.ReposicionOrderByWithRelationInput[];
    cursor?: Prisma.ReposicionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReposicionScalarFieldEnum | Prisma.ReposicionScalarFieldEnum[];
};
export type Product$historyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    where?: Prisma.ProductHistoryWhereInput;
    orderBy?: Prisma.ProductHistoryOrderByWithRelationInput | Prisma.ProductHistoryOrderByWithRelationInput[];
    cursor?: Prisma.ProductHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductHistoryScalarFieldEnum | Prisma.ProductHistoryScalarFieldEnum[];
};
export type ProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
};
