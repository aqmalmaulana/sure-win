export interface ICustomerDto {
    _id: string;
    name?: string;
    mobile_no: number;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    delete_flag?: boolean;
}