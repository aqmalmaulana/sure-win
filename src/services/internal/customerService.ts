import { Model } from "mongoose";
import customerModels, { ICustomer } from "../../models/customerModels";
import bcrypt from "bcrypt"
import { ICustomerDto } from "../../dto/customerDto";

export class CustomerService{
    private customer: Model<ICustomer>;

    constructor() {
        this.customer = customerModels
    }

    async create(data: ICustomerDto): Promise<ICustomerDto> {
        return await this.customer.create(data)
    }

    async update(data: ICustomerDto): Promise<ICustomerDto> {
        return await this.customer.findByIdAndUpdate(data._id, data)
    }

    async delete(id: string): Promise<ICustomerDto>{
        const customer = await this.customer.findById(id)
        customer.delete_flag = true

        return await customer.updateOne(customer)
    }

    async findById(id: string): Promise<ICustomerDto> {
        return await this.customer.findById(id)
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomerDto> {
        return await this.customer.findOne({
            mobile_no: mobileNo,
        })
    }

    async findByMobileNoAndPassword(mobileNo: number, password: string): Promise<ICustomerDto | any> {
        const customer = await this.findByMobileNo(mobileNo)
        if(!customer) {
            return customer
        }
        const validPassword = bcrypt.compareSync(password, customer.password)
        if(!validPassword) {
            return undefined
        }

        return customer
    }
}