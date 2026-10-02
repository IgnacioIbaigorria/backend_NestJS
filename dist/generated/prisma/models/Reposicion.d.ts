import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReposicionModel = runtime.Types.Result.DefaultSelection<Prisma.$ReposicionPayload>;
export type AggregateReposicion = {
    _count: ReposicionCountAggregateOutputType | null;
    _avg: ReposicionAvgAggregateOutputType | null;
    _sum: ReposicionSumAggregateOutputType | null;
    _min: ReposicionMinAggregateOutputType | null;
    _max: ReposicionMaxAggregateOutputType | null;
};
export type ReposicionAvgAggregateOutputType = {
    quantity: number | null;
    cost: runtime.Decimal | null;
};
export type ReposicionSumAggregateOutputType = {
    quantity: number | null;
    cost: runtime.Decimal | null;
};
export type ReposicionMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    quantity: number | null;
    supplier: string | null;
    cost: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ReposicionMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    quantity: number | null;
    supplier: string | null;
    cost: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ReposicionCountAggregateOutputType = {
    id: number;
    productId: number;
    quantity: number;
    supplier: number;
    cost: number;
    createdAt: number;
    _all: number;
};
export type ReposicionAvgAggregateInputType = {
    quantity?: true;
    cost?: true;
};
export type ReposicionSumAggregateInputType = {
    quantity?: true;
    cost?: true;
};
export type ReposicionMinAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    supplier?: true;
    cost?: true;
    createdAt?: true;
};
export type ReposicionMaxAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    supplier?: true;
    cost?: true;
    createdAt?: true;
};
export type ReposicionCountAggregateInputType = {
    id?: true;
    productId?: true;
    quantity?: true;
    supplier?: true;
    cost?: true;
    createdAt?: true;
    _all?: true;
};
export type ReposicionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReposicionWhereInput;
    orderBy?: Prisma.ReposicionOrderByWithRelationInput | Prisma.ReposicionOrderByWithRelationInput[];
    cursor?: Prisma.ReposicionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReposicionCountAggregateInputType;
    _avg?: ReposicionAvgAggregateInputType;
    _sum?: ReposicionSumAggregateInputType;
    _min?: ReposicionMinAggregateInputType;
    _max?: ReposicionMaxAggregateInputType;
};
export type GetReposicionAggregateType<T extends ReposicionAggregateArgs> = {
    [P in keyof T & keyof AggregateReposicion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReposicion[P]> : Prisma.GetScalarType<T[P], AggregateReposicion[P]>;
};
export type ReposicionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReposicionWhereInput;
    orderBy?: Prisma.ReposicionOrderByWithAggregationInput | Prisma.ReposicionOrderByWithAggregationInput[];
    by: Prisma.ReposicionScalarFieldEnum[] | Prisma.ReposicionScalarFieldEnum;
    having?: Prisma.ReposicionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReposicionCountAggregateInputType | true;
    _avg?: ReposicionAvgAggregateInputType;
    _sum?: ReposicionSumAggregateInputType;
    _min?: ReposicionMinAggregateInputType;
    _max?: ReposicionMaxAggregateInputType;
};
export type ReposicionGroupByOutputType = {
    id: string;
    productId: string;
    quantity: number;
    supplier: string | null;
    cost: runtime.Decimal | null;
    createdAt: Date;
    _count: ReposicionCountAggregateOutputType | null;
    _avg: ReposicionAvgAggregateOutputType | null;
    _sum: ReposicionSumAggregateOutputType | null;
    _min: ReposicionMinAggregateOutputType | null;
    _max: ReposicionMaxAggregateOutputType | null;
};
export type GetReposicionGroupByPayload<T extends ReposicionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReposicionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReposicionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReposicionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReposicionGroupByOutputType[P]>;
}>>;
export type ReposicionWhereInput = {
    AND?: Prisma.ReposicionWhereInput | Prisma.ReposicionWhereInput[];
    OR?: Prisma.ReposicionWhereInput[];
    NOT?: Prisma.ReposicionWhereInput | Prisma.ReposicionWhereInput[];
    id?: Prisma.StringFilter<"Reposicion"> | string;
    productId?: Prisma.StringFilter<"Reposicion"> | string;
    quantity?: Prisma.IntFilter<"Reposicion"> | number;
    supplier?: Prisma.StringNullableFilter<"Reposicion"> | string | null;
    cost?: Prisma.DecimalNullableFilter<"Reposicion"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Reposicion"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ReposicionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ReposicionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReposicionWhereInput | Prisma.ReposicionWhereInput[];
    OR?: Prisma.ReposicionWhereInput[];
    NOT?: Prisma.ReposicionWhereInput | Prisma.ReposicionWhereInput[];
    productId?: Prisma.StringFilter<"Reposicion"> | string;
    quantity?: Prisma.IntFilter<"Reposicion"> | number;
    supplier?: Prisma.StringNullableFilter<"Reposicion"> | string | null;
    cost?: Prisma.DecimalNullableFilter<"Reposicion"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Reposicion"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type ReposicionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReposicionCountOrderByAggregateInput;
    _avg?: Prisma.ReposicionAvgOrderByAggregateInput;
    _max?: Prisma.ReposicionMaxOrderByAggregateInput;
    _min?: Prisma.ReposicionMinOrderByAggregateInput;
    _sum?: Prisma.ReposicionSumOrderByAggregateInput;
};
export type ReposicionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReposicionScalarWhereWithAggregatesInput | Prisma.ReposicionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReposicionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReposicionScalarWhereWithAggregatesInput | Prisma.ReposicionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Reposicion"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"Reposicion"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"Reposicion"> | number;
    supplier?: Prisma.StringNullableWithAggregatesFilter<"Reposicion"> | string | null;
    cost?: Prisma.DecimalNullableWithAggregatesFilter<"Reposicion"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Reposicion"> | Date | string;
};
export type ReposicionCreateInput = {
    id?: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReposicionesInput;
};
export type ReposicionUncheckedCreateInput = {
    id?: string;
    productId: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type ReposicionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReposicionesNestedInput;
};
export type ReposicionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionCreateManyInput = {
    id?: string;
    productId: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type ReposicionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionListRelationFilter = {
    every?: Prisma.ReposicionWhereInput;
    some?: Prisma.ReposicionWhereInput;
    none?: Prisma.ReposicionWhereInput;
};
export type ReposicionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReposicionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReposicionAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type ReposicionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReposicionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReposicionSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type ReposicionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput> | Prisma.ReposicionCreateWithoutProductInput[] | Prisma.ReposicionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReposicionCreateOrConnectWithoutProductInput | Prisma.ReposicionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ReposicionCreateManyProductInputEnvelope;
    connect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
};
export type ReposicionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput> | Prisma.ReposicionCreateWithoutProductInput[] | Prisma.ReposicionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReposicionCreateOrConnectWithoutProductInput | Prisma.ReposicionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ReposicionCreateManyProductInputEnvelope;
    connect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
};
export type ReposicionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput> | Prisma.ReposicionCreateWithoutProductInput[] | Prisma.ReposicionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReposicionCreateOrConnectWithoutProductInput | Prisma.ReposicionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ReposicionUpsertWithWhereUniqueWithoutProductInput | Prisma.ReposicionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ReposicionCreateManyProductInputEnvelope;
    set?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    disconnect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    delete?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    connect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    update?: Prisma.ReposicionUpdateWithWhereUniqueWithoutProductInput | Prisma.ReposicionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ReposicionUpdateManyWithWhereWithoutProductInput | Prisma.ReposicionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ReposicionScalarWhereInput | Prisma.ReposicionScalarWhereInput[];
};
export type ReposicionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput> | Prisma.ReposicionCreateWithoutProductInput[] | Prisma.ReposicionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ReposicionCreateOrConnectWithoutProductInput | Prisma.ReposicionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ReposicionUpsertWithWhereUniqueWithoutProductInput | Prisma.ReposicionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ReposicionCreateManyProductInputEnvelope;
    set?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    disconnect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    delete?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    connect?: Prisma.ReposicionWhereUniqueInput | Prisma.ReposicionWhereUniqueInput[];
    update?: Prisma.ReposicionUpdateWithWhereUniqueWithoutProductInput | Prisma.ReposicionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ReposicionUpdateManyWithWhereWithoutProductInput | Prisma.ReposicionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ReposicionScalarWhereInput | Prisma.ReposicionScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ReposicionCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type ReposicionUncheckedCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type ReposicionCreateOrConnectWithoutProductInput = {
    where: Prisma.ReposicionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput>;
};
export type ReposicionCreateManyProductInputEnvelope = {
    data: Prisma.ReposicionCreateManyProductInput | Prisma.ReposicionCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ReposicionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ReposicionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReposicionUpdateWithoutProductInput, Prisma.ReposicionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ReposicionCreateWithoutProductInput, Prisma.ReposicionUncheckedCreateWithoutProductInput>;
};
export type ReposicionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ReposicionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReposicionUpdateWithoutProductInput, Prisma.ReposicionUncheckedUpdateWithoutProductInput>;
};
export type ReposicionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ReposicionScalarWhereInput;
    data: Prisma.XOR<Prisma.ReposicionUpdateManyMutationInput, Prisma.ReposicionUncheckedUpdateManyWithoutProductInput>;
};
export type ReposicionScalarWhereInput = {
    AND?: Prisma.ReposicionScalarWhereInput | Prisma.ReposicionScalarWhereInput[];
    OR?: Prisma.ReposicionScalarWhereInput[];
    NOT?: Prisma.ReposicionScalarWhereInput | Prisma.ReposicionScalarWhereInput[];
    id?: Prisma.StringFilter<"Reposicion"> | string;
    productId?: Prisma.StringFilter<"Reposicion"> | string;
    quantity?: Prisma.IntFilter<"Reposicion"> | number;
    supplier?: Prisma.StringNullableFilter<"Reposicion"> | string | null;
    cost?: Prisma.DecimalNullableFilter<"Reposicion"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Reposicion"> | Date | string;
};
export type ReposicionCreateManyProductInput = {
    id?: string;
    quantity: number;
    supplier?: string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
};
export type ReposicionUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReposicionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    supplier?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reposicion"]>;
export type ReposicionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    supplier?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reposicion"]>;
export type ReposicionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    supplier?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reposicion"]>;
export type ReposicionSelectScalar = {
    id?: boolean;
    productId?: boolean;
    quantity?: boolean;
    supplier?: boolean;
    cost?: boolean;
    createdAt?: boolean;
};
export type ReposicionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "quantity" | "supplier" | "cost" | "createdAt", ExtArgs["result"]["reposicion"]>;
export type ReposicionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ReposicionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ReposicionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ReposicionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Reposicion";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        quantity: number;
        supplier: string | null;
        cost: runtime.Decimal | null;
        createdAt: Date;
    }, ExtArgs["result"]["reposicion"]>;
    composites: {};
};
export type ReposicionGetPayload<S extends boolean | null | undefined | ReposicionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReposicionPayload, S>;
export type ReposicionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReposicionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReposicionCountAggregateInputType | true;
};
export interface ReposicionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Reposicion'];
        meta: {
            name: 'Reposicion';
        };
    };
    findUnique<T extends ReposicionFindUniqueArgs>(args: Prisma.SelectSubset<T, ReposicionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReposicionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReposicionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReposicionFindFirstArgs>(args?: Prisma.SelectSubset<T, ReposicionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReposicionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReposicionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReposicionFindManyArgs>(args?: Prisma.SelectSubset<T, ReposicionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReposicionCreateArgs>(args: Prisma.SelectSubset<T, ReposicionCreateArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReposicionCreateManyArgs>(args?: Prisma.SelectSubset<T, ReposicionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReposicionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReposicionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReposicionDeleteArgs>(args: Prisma.SelectSubset<T, ReposicionDeleteArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReposicionUpdateArgs>(args: Prisma.SelectSubset<T, ReposicionUpdateArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReposicionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReposicionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReposicionUpdateManyArgs>(args: Prisma.SelectSubset<T, ReposicionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReposicionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReposicionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReposicionUpsertArgs>(args: Prisma.SelectSubset<T, ReposicionUpsertArgs<ExtArgs>>): Prisma.Prisma__ReposicionClient<runtime.Types.Result.GetResult<Prisma.$ReposicionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReposicionCountArgs>(args?: Prisma.Subset<T, ReposicionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReposicionCountAggregateOutputType> : number>;
    aggregate<T extends ReposicionAggregateArgs>(args: Prisma.Subset<T, ReposicionAggregateArgs>): Prisma.PrismaPromise<GetReposicionAggregateType<T>>;
    groupBy<T extends ReposicionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReposicionGroupByArgs['orderBy'];
    } : {
        orderBy?: ReposicionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReposicionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReposicionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReposicionFieldRefs;
}
export interface Prisma__ReposicionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReposicionFieldRefs {
    readonly id: Prisma.FieldRef<"Reposicion", 'String'>;
    readonly productId: Prisma.FieldRef<"Reposicion", 'String'>;
    readonly quantity: Prisma.FieldRef<"Reposicion", 'Int'>;
    readonly supplier: Prisma.FieldRef<"Reposicion", 'String'>;
    readonly cost: Prisma.FieldRef<"Reposicion", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Reposicion", 'DateTime'>;
}
export type ReposicionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    where: Prisma.ReposicionWhereUniqueInput;
};
export type ReposicionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    where: Prisma.ReposicionWhereUniqueInput;
};
export type ReposicionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReposicionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReposicionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReposicionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReposicionCreateInput, Prisma.ReposicionUncheckedCreateInput>;
};
export type ReposicionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReposicionCreateManyInput | Prisma.ReposicionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReposicionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    data: Prisma.ReposicionCreateManyInput | Prisma.ReposicionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReposicionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReposicionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReposicionUpdateInput, Prisma.ReposicionUncheckedUpdateInput>;
    where: Prisma.ReposicionWhereUniqueInput;
};
export type ReposicionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReposicionUpdateManyMutationInput, Prisma.ReposicionUncheckedUpdateManyInput>;
    where?: Prisma.ReposicionWhereInput;
    limit?: number;
};
export type ReposicionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReposicionUpdateManyMutationInput, Prisma.ReposicionUncheckedUpdateManyInput>;
    where?: Prisma.ReposicionWhereInput;
    limit?: number;
    include?: Prisma.ReposicionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReposicionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    where: Prisma.ReposicionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReposicionCreateInput, Prisma.ReposicionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReposicionUpdateInput, Prisma.ReposicionUncheckedUpdateInput>;
};
export type ReposicionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
    where: Prisma.ReposicionWhereUniqueInput;
};
export type ReposicionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReposicionWhereInput;
    limit?: number;
};
export type ReposicionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReposicionSelect<ExtArgs> | null;
    omit?: Prisma.ReposicionOmit<ExtArgs> | null;
    include?: Prisma.ReposicionInclude<ExtArgs> | null;
};
