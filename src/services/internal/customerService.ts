import { Model } from "mongoose";
import customerModels, { ICustomer } from "../../models/customerModels";
import bcrypt from "bcrypt"
import { CustomerDto } from "../../dto/customerDto";

export class CustomerService{
    private customer: Model<ICustomer>;

    constructor() {
        this.customer = customerModels
    }

    async create(data: CustomerDto): Promise<ICustomer> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.customer.create(clone)
    }

    async update(data: CustomerDto): Promise<ICustomer> {
        return await this.customer.findOneAndUpdate({
            $and: [
                { id: data.id },
                { deleteFlag: false }
            ]
        }, data,
        { new: true })
    }

    async delete(id: string): Promise<ICustomer>{
        return await this.customer.findOneAndUpdate({
            $and: [
                { id },
                { deleteFlag: false }
            ]
        },
        {
            deleteFlag: true
        },
        { new: true })
    }

    async findById(id: string): Promise<ICustomer> {
        return await this.customer.findOne({
            $and: [
                { id },
                { deleteFlag: false }
            ]
        })
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomer> {
        return await this.customer.findOne({
            $and: [
                { mobileNo: mobileNo },
                { deleteFlag: false }
            ]
        })
    }

    async findByMobileNoAndPassword(mobileNo: number, password: string): Promise<ICustomer | any> {
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

    async getLastIdCustomer(): Promise<ICustomer> {
        return await this.customer.findOne({}).sort({accountNo: -1})
    }
}