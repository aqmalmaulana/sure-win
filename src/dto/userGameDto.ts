export class UserGameDto {
    id?: string;
    cifId: string;
    gameId: string;
    productId: string;
    spent: string;
    result: "PENDING" | "WIN" | "LOSS";
    createdAt?: Date;
    updatedAt?: Date;
}
