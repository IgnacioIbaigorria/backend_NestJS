declare class PaymentDto {
    amount: number;
    paymentMethod: string;
}
export declare class CreateSaleDto {
    productId: string;
    quantity: number;
    payments?: PaymentDto[];
}
export {};
