export class CustomerDto {
    public id: string;
    public name: string;
    public mobileNo: number;
    public password: string;
    public deleteFlag?: boolean;
    public roleId?: string;
    public accountNo: string;
    public createdDate?: Date;
    public updatedDate?: Date;
}