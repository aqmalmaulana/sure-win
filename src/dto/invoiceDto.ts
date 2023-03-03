export class InvoiceDto {
    id: string;
    trxRefNo: string;
    xenditRefNo: string;
    status: string;
    merchantName: string;
    amount: number;
    createdDate: Date;
    updatedDate: Date;
    payerEmail: string;
    description: string;
    paymentId?: string;
    paidAmount?: number;
    paymentMethod?: string;
    ewalletType?: string;
    currency: string;
    paidAt?: Date;
    paymentChannel?: string;
    paymentMethodId?: string;
    invoiceUrl: string;
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>
}