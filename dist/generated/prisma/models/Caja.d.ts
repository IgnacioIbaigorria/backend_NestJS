import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CajaModel = runtime.Types.Result.DefaultSelection<Prisma.$CajaPayload>;
export type AggregateCaja = {
    _count: CajaCountAggregateOutputType | null;
    _min: CajaMinAggregateOutputType | null;
    _max: CajaMaxAggregateOutputType | null;
};
export type CajaMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CajaMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CajaCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CajaMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CajaMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CajaCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CajaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CajaWhereInput;
    orderBy?: Prisma.CajaOrderByWithRelationInput | Prisma.CajaOrderByWithRelationInput[];
    cursor?: Prisma.CajaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CajaCountAggregateInputType;
    _min?: CajaMinAggregateInputType;
    _max?: CajaMaxAggregateInputType;
};
export type GetCajaAggregateType<T extends CajaAggregateArgs> = {
    [P in keyof T & keyof AggregateCaja]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCaja[P]> : Prisma.GetScalarType<T[P], AggregateCaja[P]>;
};
export type CajaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CajaWhereInput;
    orderBy?: Prisma.CajaOrderByWithAggregationInput | Prisma.CajaOrderByWithAggregationInput[];
    by: Prisma.CajaScalarFieldEnum[] | Prisma.CajaScalarFieldEnum;
    having?: Prisma.CajaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CajaCountAggregateInputType | true;
    _min?: CajaMinAggregateInputType;
    _max?: CajaMaxAggregateInputType;
};
export type CajaGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CajaCountAggregateOutputType | null;
    _min: CajaMinAggregateOutputType | null;
    _max: CajaMaxAggregateOutputType | null;
};
export type GetCajaGroupByPayload<T extends CajaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CajaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CajaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CajaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CajaGroupByOutputType[P]>;
}>>;
export type CajaWhereInput = {
    AND?: Prisma.CajaWhereInput | Prisma.CajaWhereInput[];
    OR?: Prisma.CajaWhereInput[];
    NOT?: Prisma.CajaWhereInput | Prisma.CajaWhereInput[];
    id?: Prisma.StringFilter<"Caja"> | string;
    createdAt?: Prisma.DateTimeFilter<"Caja"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Caja"> | Date | string;
};
export type CajaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CajaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CajaWhereInput | Prisma.CajaWhereInput[];
    OR?: Prisma.CajaWhereInput[];
    NOT?: Prisma.CajaWhereInput | Prisma.CajaWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Caja"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Caja"> | Date | string;
}, "id">;
export type CajaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CajaCountOrderByAggregateInput;
    _max?: Prisma.CajaMaxOrderByAggregateInput;
    _min?: Prisma.CajaMinOrderByAggregateInput;
};
export type CajaScalarWhereWithAggregatesInput = {
    AND?: Prisma.CajaScalarWhereWithAggregatesInput | Prisma.CajaScalarWhereWithAggregatesInput[];
    OR?: Prisma.CajaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CajaScalarWhereWithAggregatesInput | Prisma.CajaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Caja"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Caja"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Caja"> | Date | string;
};
export type CajaCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CajaUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CajaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CajaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CajaCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CajaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CajaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CajaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CajaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CajaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CajaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["caja"]>;
export type CajaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["caja"]>;
export type CajaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["caja"]>;
export type CajaSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CajaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["caja"]>;
export type $CajaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Caja";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["caja"]>;
    composites: {};
};
export type CajaGetPayload<S extends boolean | null | undefined | CajaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CajaPayload, S>;
export type CajaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CajaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CajaCountAggregateInputType | true;
};
export interface CajaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Caja'];
        meta: {
            name: 'Caja';
        };
    };
    findUnique<T extends CajaFindUniqueArgs>(args: Prisma.SelectSubset<T, CajaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CajaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CajaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CajaFindFirstArgs>(args?: Prisma.SelectSubset<T, CajaFindFirstArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CajaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CajaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CajaFindManyArgs>(args?: Prisma.SelectSubset<T, CajaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CajaCreateArgs>(args: Prisma.SelectSubset<T, CajaCreateArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CajaCreateManyArgs>(args?: Prisma.SelectSubset<T, CajaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CajaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CajaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CajaDeleteArgs>(args: Prisma.SelectSubset<T, CajaDeleteArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CajaUpdateArgs>(args: Prisma.SelectSubset<T, CajaUpdateArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CajaDeleteManyArgs>(args?: Prisma.SelectSubset<T, CajaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CajaUpdateManyArgs>(args: Prisma.SelectSubset<T, CajaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CajaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CajaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CajaUpsertArgs>(args: Prisma.SelectSubset<T, CajaUpsertArgs<ExtArgs>>): Prisma.Prisma__CajaClient<runtime.Types.Result.GetResult<Prisma.$CajaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CajaCountArgs>(args?: Prisma.Subset<T, CajaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CajaCountAggregateOutputType> : number>;
    aggregate<T extends CajaAggregateArgs>(args: Prisma.Subset<T, CajaAggregateArgs>): Prisma.PrismaPromise<GetCajaAggregateType<T>>;
    groupBy<T extends CajaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CajaGroupByArgs['orderBy'];
    } : {
        orderBy?: CajaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CajaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCajaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CajaFieldRefs;
}
export interface Prisma__CajaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CajaFieldRefs {
    readonly id: Prisma.FieldRef<"Caja", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Caja", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Caja", 'DateTime'>;
}
export type CajaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where: Prisma.CajaWhereUniqueInput;
};
export type CajaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where: Prisma.CajaWhereUniqueInput;
};
export type CajaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where?: Prisma.CajaWhereInput;
    orderBy?: Prisma.CajaOrderByWithRelationInput | Prisma.CajaOrderByWithRelationInput[];
    cursor?: Prisma.CajaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CajaScalarFieldEnum | Prisma.CajaScalarFieldEnum[];
};
export type CajaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where?: Prisma.CajaWhereInput;
    orderBy?: Prisma.CajaOrderByWithRelationInput | Prisma.CajaOrderByWithRelationInput[];
    cursor?: Prisma.CajaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CajaScalarFieldEnum | Prisma.CajaScalarFieldEnum[];
};
export type CajaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where?: Prisma.CajaWhereInput;
    orderBy?: Prisma.CajaOrderByWithRelationInput | Prisma.CajaOrderByWithRelationInput[];
    cursor?: Prisma.CajaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CajaScalarFieldEnum | Prisma.CajaScalarFieldEnum[];
};
export type CajaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CajaCreateInput, Prisma.CajaUncheckedCreateInput>;
};
export type CajaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CajaCreateManyInput | Prisma.CajaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CajaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    data: Prisma.CajaCreateManyInput | Prisma.CajaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CajaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CajaUpdateInput, Prisma.CajaUncheckedUpdateInput>;
    where: Prisma.CajaWhereUniqueInput;
};
export type CajaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CajaUpdateManyMutationInput, Prisma.CajaUncheckedUpdateManyInput>;
    where?: Prisma.CajaWhereInput;
    limit?: number;
};
export type CajaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CajaUpdateManyMutationInput, Prisma.CajaUncheckedUpdateManyInput>;
    where?: Prisma.CajaWhereInput;
    limit?: number;
};
export type CajaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where: Prisma.CajaWhereUniqueInput;
    create: Prisma.XOR<Prisma.CajaCreateInput, Prisma.CajaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CajaUpdateInput, Prisma.CajaUncheckedUpdateInput>;
};
export type CajaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
    where: Prisma.CajaWhereUniqueInput;
};
export type CajaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CajaWhereInput;
    limit?: number;
};
export type CajaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CajaSelect<ExtArgs> | null;
    omit?: Prisma.CajaOmit<ExtArgs> | null;
};
