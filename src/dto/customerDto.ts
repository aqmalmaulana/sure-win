export interface ICustomerDto {
    _id: string;
    name?: string;
    mobileNo?: number;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteFlag?: boolean;
    roleId?: string;
    accountNo?: string;
}