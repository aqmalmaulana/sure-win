export class OrderDto {
    id: string;
    trxRefNo: string;
    accountNo: string;
    productId: string;
    amount: number;
    fee?: number;
    status?: string;
    type: "Buy" | "Sell" | "Win" | "Loss" | "Bonus";
    currency?: "IDR";
    updatedDate?: Date;
    submittedDate?: Date;
    processingDate?: Date;
    completedDate?: Date;
}