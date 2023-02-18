import { Model } from "mongoose";
import { ICustomer } from "../interfaces";
import customerModels from "../models/customerModels";

export class CustomerService{
    private customer: Model<ICustomer>;

    constructor() {
        this.customer = customerModels
    }

    async create(data: ICustomer): Promise<ICustomer> {
        return await this.customer.create(data)
    }

    async update(id: string, data: ICustomer): Promise<ICustomer> {
        return await this.customer.findByIdAndUpdate(id, data)
    }

    async delete(id: string): Promise<ICustomer>{
        const customer = await this.customer.findById(id)
        customer.delete_flag = true

        return await customer.updateOne(customer)
    }

    async findById(id: string): Promise<ICustomer> {
        return await this.customer.findById(id)
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomer> {
        return await this.customer.findOne({
            mobile_no: mobileNo
        })
    }
}