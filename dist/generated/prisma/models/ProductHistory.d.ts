import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductHistoryPayload>;
export type AggregateProductHistory = {
    _count: ProductHistoryCountAggregateOutputType | null;
    _min: ProductHistoryMinAggregateOutputType | null;
    _max: ProductHistoryMaxAggregateOutputType | null;
};
export type ProductHistoryMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    field: string | null;
    oldValue: string | null;
    newValue: string | null;
    changedBy: string | null;
    createdAt: Date | null;
};
export type ProductHistoryMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    field: string | null;
    oldValue: string | null;
    newValue: string | null;
    changedBy: string | null;
    createdAt: Date | null;
};
export type ProductHistoryCountAggregateOutputType = {
    id: number;
    productId: number;
    field: number;
    oldValue: number;
    newValue: number;
    changedBy: number;
    createdAt: number;
    _all: number;
};
export type ProductHistoryMinAggregateInputType = {
    id?: true;
    productId?: true;
    field?: true;
    oldValue?: true;
    newValue?: true;
    changedBy?: true;
    createdAt?: true;
};
export type ProductHistoryMaxAggregateInputType = {
    id?: true;
    productId?: true;
    field?: true;
    oldValue?: true;
    newValue?: true;
    changedBy?: true;
    createdAt?: true;
};
export type ProductHistoryCountAggregateInputType = {
    id?: true;
    productId?: true;
    field?: true;
    oldValue?: true;
    newValue?: true;
    changedBy?: true;
    createdAt?: true;
    _all?: true;
};
export type ProductHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductHistoryWhereInput;
    orderBy?: Prisma.ProductHistoryOrderByWithRelationInput | Prisma.ProductHistoryOrderByWithRelationInput[];
    cursor?: Prisma.ProductHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductHistoryCountAggregateInputType;
    _min?: ProductHistoryMinAggregateInputType;
    _max?: ProductHistoryMaxAggregateInputType;
};
export type GetProductHistoryAggregateType<T extends ProductHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateProductHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductHistory[P]> : Prisma.GetScalarType<T[P], AggregateProductHistory[P]>;
};
export type ProductHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductHistoryWhereInput;
    orderBy?: Prisma.ProductHistoryOrderByWithAggregationInput | Prisma.ProductHistoryOrderByWithAggregationInput[];
    by: Prisma.ProductHistoryScalarFieldEnum[] | Prisma.ProductHistoryScalarFieldEnum;
    having?: Prisma.ProductHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductHistoryCountAggregateInputType | true;
    _min?: ProductHistoryMinAggregateInputType;
    _max?: ProductHistoryMaxAggregateInputType;
};
export type ProductHistoryGroupByOutputType = {
    id: string;
    productId: string;
    field: string;
    oldValue: string | null;
    newValue: string | null;
    changedBy: string | null;
    createdAt: Date;
    _count: ProductHistoryCountAggregateOutputType | null;
    _min: ProductHistoryMinAggregateOutputType | null;
    _max: ProductHistoryMaxAggregateOutputType | null;
};
export type GetProductHistoryGroupByPayload<T extends ProductHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductHistoryGroupByOutputType[P]>;
}>>;
export type ProductHistoryWhereInput = {
    AND?: Prisma.ProductHistoryWhereInput | Prisma.ProductHistoryWhereInput[];
    OR?: Prisma.ProductHistoryWhereInput[];
    NOT?: Prisma.ProductHistoryWhereInput | Prisma.ProductHistoryWhereInput[];
    id?: Prisma.StringFilter<"ProductHistory"> | string;
    productId?: Prisma.StringFilter<"ProductHistory"> | string;
    field?: Prisma.StringFilter<"ProductHistory"> | string;
    oldValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    changedBy?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductHistory"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductHistoryWhereInput | Prisma.ProductHistoryWhereInput[];
    OR?: Prisma.ProductHistoryWhereInput[];
    NOT?: Prisma.ProductHistoryWhereInput | Prisma.ProductHistoryWhereInput[];
    productId?: Prisma.StringFilter<"ProductHistory"> | string;
    field?: Prisma.StringFilter<"ProductHistory"> | string;
    oldValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    changedBy?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductHistory"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type ProductHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    changedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProductHistoryCountOrderByAggregateInput;
    _max?: Prisma.ProductHistoryMaxOrderByAggregateInput;
    _min?: Prisma.ProductHistoryMinOrderByAggregateInput;
};
export type ProductHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductHistoryScalarWhereWithAggregatesInput | Prisma.ProductHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductHistoryScalarWhereWithAggregatesInput | Prisma.ProductHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductHistory"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductHistory"> | string;
    field?: Prisma.StringWithAggregatesFilter<"ProductHistory"> | string;
    oldValue?: Prisma.StringNullableWithAggregatesFilter<"ProductHistory"> | string | null;
    newValue?: Prisma.StringNullableWithAggregatesFilter<"ProductHistory"> | string | null;
    changedBy?: Prisma.StringNullableWithAggregatesFilter<"ProductHistory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductHistory"> | Date | string;
};
export type ProductHistoryCreateInput = {
    id?: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutHistoryInput;
};
export type ProductHistoryUncheckedCreateInput = {
    id?: string;
    productId: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
};
export type ProductHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutHistoryNestedInput;
};
export type ProductHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistoryCreateManyInput = {
    id?: string;
    productId: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
};
export type ProductHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistoryListRelationFilter = {
    every?: Prisma.ProductHistoryWhereInput;
    some?: Prisma.ProductHistoryWhereInput;
    none?: Prisma.ProductHistoryWhereInput;
};
export type ProductHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    changedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductHistoryCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput> | Prisma.ProductHistoryCreateWithoutProductInput[] | Prisma.ProductHistoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductHistoryCreateOrConnectWithoutProductInput | Prisma.ProductHistoryCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductHistoryCreateManyProductInputEnvelope;
    connect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
};
export type ProductHistoryUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput> | Prisma.ProductHistoryCreateWithoutProductInput[] | Prisma.ProductHistoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductHistoryCreateOrConnectWithoutProductInput | Prisma.ProductHistoryCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductHistoryCreateManyProductInputEnvelope;
    connect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
};
export type ProductHistoryUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput> | Prisma.ProductHistoryCreateWithoutProductInput[] | Prisma.ProductHistoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductHistoryCreateOrConnectWithoutProductInput | Prisma.ProductHistoryCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductHistoryUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductHistoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductHistoryCreateManyProductInputEnvelope;
    set?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    disconnect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    delete?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    connect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    update?: Prisma.ProductHistoryUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductHistoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductHistoryUpdateManyWithWhereWithoutProductInput | Prisma.ProductHistoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductHistoryScalarWhereInput | Prisma.ProductHistoryScalarWhereInput[];
};
export type ProductHistoryUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput> | Prisma.ProductHistoryCreateWithoutProductInput[] | Prisma.ProductHistoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductHistoryCreateOrConnectWithoutProductInput | Prisma.ProductHistoryCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductHistoryUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductHistoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductHistoryCreateManyProductInputEnvelope;
    set?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    disconnect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    delete?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    connect?: Prisma.ProductHistoryWhereUniqueInput | Prisma.ProductHistoryWhereUniqueInput[];
    update?: Prisma.ProductHistoryUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductHistoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductHistoryUpdateManyWithWhereWithoutProductInput | Prisma.ProductHistoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductHistoryScalarWhereInput | Prisma.ProductHistoryScalarWhereInput[];
};
export type ProductHistoryCreateWithoutProductInput = {
    id?: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
};
export type ProductHistoryUncheckedCreateWithoutProductInput = {
    id?: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
};
export type ProductHistoryCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput>;
};
export type ProductHistoryCreateManyProductInputEnvelope = {
    data: Prisma.ProductHistoryCreateManyProductInput | Prisma.ProductHistoryCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductHistoryUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductHistoryUpdateWithoutProductInput, Prisma.ProductHistoryUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductHistoryCreateWithoutProductInput, Prisma.ProductHistoryUncheckedCreateWithoutProductInput>;
};
export type ProductHistoryUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductHistoryUpdateWithoutProductInput, Prisma.ProductHistoryUncheckedUpdateWithoutProductInput>;
};
export type ProductHistoryUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductHistoryUpdateManyMutationInput, Prisma.ProductHistoryUncheckedUpdateManyWithoutProductInput>;
};
export type ProductHistoryScalarWhereInput = {
    AND?: Prisma.ProductHistoryScalarWhereInput | Prisma.ProductHistoryScalarWhereInput[];
    OR?: Prisma.ProductHistoryScalarWhereInput[];
    NOT?: Prisma.ProductHistoryScalarWhereInput | Prisma.ProductHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductHistory"> | string;
    productId?: Prisma.StringFilter<"ProductHistory"> | string;
    field?: Prisma.StringFilter<"ProductHistory"> | string;
    oldValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    changedBy?: Prisma.StringNullableFilter<"ProductHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductHistory"> | Date | string;
};
export type ProductHistoryCreateManyProductInput = {
    id?: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy?: string | null;
    createdAt?: Date | string;
};
export type ProductHistoryUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistoryUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistoryUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    changedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    field?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    changedBy?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productHistory"]>;
export type ProductHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    field?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    changedBy?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productHistory"]>;
export type ProductHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    field?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    changedBy?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productHistory"]>;
export type ProductHistorySelectScalar = {
    id?: boolean;
    productId?: boolean;
    field?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    changedBy?: boolean;
    createdAt?: boolean;
};
export type ProductHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "field" | "oldValue" | "newValue" | "changedBy" | "createdAt", ExtArgs["result"]["productHistory"]>;
export type ProductHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductHistory";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        changedBy: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["productHistory"]>;
    composites: {};
};
export type ProductHistoryGetPayload<S extends boolean | null | undefined | ProductHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload, S>;
export type ProductHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductHistoryCountAggregateInputType | true;
};
export interface ProductHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductHistory'];
        meta: {
            name: 'ProductHistory';
        };
    };
    findUnique<T extends ProductHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, ProductHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductHistoryCreateArgs>(args: Prisma.SelectSubset<T, ProductHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductHistoryDeleteArgs>(args: Prisma.SelectSubset<T, ProductHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductHistoryUpdateArgs>(args: Prisma.SelectSubset<T, ProductHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductHistoryUpsertArgs>(args: Prisma.SelectSubset<T, ProductHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductHistoryClient<runtime.Types.Result.GetResult<Prisma.$ProductHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductHistoryCountArgs>(args?: Prisma.Subset<T, ProductHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductHistoryCountAggregateOutputType> : number>;
    aggregate<T extends ProductHistoryAggregateArgs>(args: Prisma.Subset<T, ProductHistoryAggregateArgs>): Prisma.PrismaPromise<GetProductHistoryAggregateType<T>>;
    groupBy<T extends ProductHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductHistoryFieldRefs;
}
export interface Prisma__ProductHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly field: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly oldValue: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly newValue: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly changedBy: Prisma.FieldRef<"ProductHistory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProductHistory", 'DateTime'>;
}
export type ProductHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    where: Prisma.ProductHistoryWhereUniqueInput;
};
export type ProductHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    where: Prisma.ProductHistoryWhereUniqueInput;
};
export type ProductHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductHistoryCreateInput, Prisma.ProductHistoryUncheckedCreateInput>;
};
export type ProductHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductHistoryCreateManyInput | Prisma.ProductHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    data: Prisma.ProductHistoryCreateManyInput | Prisma.ProductHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductHistoryUpdateInput, Prisma.ProductHistoryUncheckedUpdateInput>;
    where: Prisma.ProductHistoryWhereUniqueInput;
};
export type ProductHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductHistoryUpdateManyMutationInput, Prisma.ProductHistoryUncheckedUpdateManyInput>;
    where?: Prisma.ProductHistoryWhereInput;
    limit?: number;
};
export type ProductHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductHistoryUpdateManyMutationInput, Prisma.ProductHistoryUncheckedUpdateManyInput>;
    where?: Prisma.ProductHistoryWhereInput;
    limit?: number;
    include?: Prisma.ProductHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    where: Prisma.ProductHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductHistoryCreateInput, Prisma.ProductHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductHistoryUpdateInput, Prisma.ProductHistoryUncheckedUpdateInput>;
};
export type ProductHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
    where: Prisma.ProductHistoryWhereUniqueInput;
};
export type ProductHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductHistoryWhereInput;
    limit?: number;
};
export type ProductHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductHistorySelect<ExtArgs> | null;
    omit?: Prisma.ProductHistoryOmit<ExtArgs> | null;
    include?: Prisma.ProductHistoryInclude<ExtArgs> | null;
};
