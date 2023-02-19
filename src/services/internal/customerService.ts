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
                { deleteFlag: false }
            ]
        }, data,
        { new: true })
    }

    async delete(id: string): Promise<ICustomerDto>{
        return await this.customer.findOneAndUpdate({
            $and: [
                { _id: id },
                { deleteFlag: false }
            ]
        },
        {
            deleteFlag: true
        },
        { new: true })
    }

    async findById(id: string): Promise<ICustomerDto> {
        return await this.customer.findOne({
            $and: [
                { _id: id },
                { deleteFlag: false }
            ]
        })
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomerDto> {
        return await this.customer.findOne({
            $and: [
                { mobileNo: mobileNo },
                { deleteFlag: false }
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

    async getLastIdCustomer(): Promise<ICustomerDto> {
        return await this.customer.findOne({}).sort({accountNo: -1})
    }
}