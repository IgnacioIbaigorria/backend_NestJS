import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Category: 'Category',
    Tag: 'Tag',
    Product: 'Product',
    Sale: 'Sale',
    Payment: 'Payment',
    Caja: 'Caja',
    Expense: 'Expense',
    Reposicion: 'Reposicion',
    ProductHistory: 'ProductHistory'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TagScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    costPrice: 'costPrice',
    stock: 'stock',
    minStock: 'minStock',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SaleScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    total: 'total',
    createdAt: 'createdAt'
};
export const PaymentScalarFieldEnum = {
    id: 'id',
    saleId: 'saleId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    createdAt: 'createdAt'
};
export const CajaScalarFieldEnum = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ExpenseScalarFieldEnum = {
    id: 'id',
    description: 'description',
    amount: 'amount',
    createdAt: 'createdAt'
};
export const ReposicionScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    supplier: 'supplier',
    cost: 'cost',
    createdAt: 'createdAt'
};
export const ProductHistoryScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    field: 'field',
    oldValue: 'oldValue',
    newValue: 'newValue',
    changedBy: 'changedBy',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map