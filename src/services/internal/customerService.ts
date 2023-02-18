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
        return await this.customer.findOneAndUpdate({
            $and: [
                { _id: data._id },
                { delete_flag: false }
            ]
        }, data,
        { new: true })
    }

    async delete(id: string): Promise<ICustomerDto>{
        return await this.customer.findOneAndUpdate({
            $and: [
                { _id: id },
                { delete_flag: false }
            ]
        },
        {
            delete_flag: true
        },
        { new: true })
    }

    async findById(id: string): Promise<ICustomerDto> {
        return await this.customer.findOne({
            $and: [
                { _id: id },
                { delete_flag: false }
            ]
        })
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomerDto> {
        return await this.customer.findOne({
            $and: [
                { mobile_no: mobileNo },
                { delete_flag: false }
            ]
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