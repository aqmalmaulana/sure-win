export class ProductDto {
    id: string;
    name: string;
    price: number;
    discount?: number;
    priceAfterDiscount?: number;
    currency?: string;
    description: string;
    category: string;
    isActive?: boolean;
    deleteFlag?: boolean;
}