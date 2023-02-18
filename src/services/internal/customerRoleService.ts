import { Model } from "mongoose";
import customerModels, { ICustomerRole } from "../../models/customerRoleModels";
import { ICustomerRoleDto } from "../../dto/customerRoleDto";

export class CustomerRoleService{
    private role: Model<ICustomerRole>;

    constructor() {
        this.role = customerModels
    }

    async create(data: ICustomerRoleDto): Promise<ICustomerRoleDto> {
        return await this.role.create(data)
    }

    async createBulk(data: ICustomerRoleDto[]): Promise<ICustomerRoleDto[]> {
        return await this.role.insertMany(data)
    }

    async update(data: ICustomerRoleDto): Promise<ICustomerRoleDto> {
        return await this.role.findByIdAndUpdate(data._id, data)
    }

    async delete(id: string): Promise<ICustomerRoleDto>{
        const role = await this.role.findById(id)
        role.delete_flag = true;

        return await role.updateOne(role)
    }

    async findById(id: string): Promise<ICustomerRoleDto> {
        return await this.role.findById(id)
    }

    async findByName(name: string): Promise<ICustomerRoleDto> {
        return await this.role.findOne({
            name
        })
    }

    async findAll(): Promise<ICustomerRoleDto[]> {
        return await this.role.find()
    }
}