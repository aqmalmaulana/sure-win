import { Model } from "mongoose";
import customerModels, { ICustomerRole } from "../../models/customerRoleModels";
import { CustomerRoleDto } from "../../dto/customerRoleDto";

export class CustomerRoleService{
    private role: Model<ICustomerRole>;

    constructor() {
        this.role = customerModels
    }

    async create(data: CustomerRoleDto): Promise<ICustomerRole> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.role.create(clone)
    }

    async createBulk(datas: CustomerRoleDto[]): Promise<ICustomerRole[]> {
        const clone = JSON.parse(JSON.stringify(datas))
        for(const data of clone) {
            data._id = data.id
            delete data.id
        }
        return await this.role.insertMany(clone)
    }

    async update(data: CustomerRoleDto): Promise<ICustomerRole> {
        return await this.role.findByIdAndUpdate(data.id, data)
    }

    async delete(id: string): Promise<ICustomerRole>{
        return await this.role.findOneAndUpdate(
            {_id: id},
            {deleteFlag: true},
            {new: true}
        )
    }

    async findById(id: string): Promise<ICustomerRole> {
        return await this.role.findOne({
            _id: id,
            deleteFlag: false
        })
    }

    async findByName(name: string): Promise<ICustomerRole> {
        return await this.role.findOne({
            name,
            deleteFlag: false
        })
    }

    async findAll(): Promise<ICustomerRole[]> {
        return await this.role.find({
            deleteFlag: false
        })
    }
}