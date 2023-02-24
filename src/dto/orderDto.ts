export interface IOrderDto {
    id: string;
    trxRefNo: string;
    accountNo: string;
    amount: number;
    fee?: number;
    status?: string;
    type: "Buy" | "Sell" | "Win" | "Loss" | "Bonus";
    invoiceUrl?: string;
    currency?: "IDR";
    updatedDate?: Date;
    submittedDate?: Date;
    processingDate?: Date;
    completedDate?: Date;
}