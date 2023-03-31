export class CustomerDto {
    public id?: string;
    public username: string;
    public email: string;
    public accountNo?: string;
    public password?: string;
    public address: string;
    public authentication?: boolean;
    public authKey?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deleteFlag?: boolean;
    public roleId?: string;
}
