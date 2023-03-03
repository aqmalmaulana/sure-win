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
        clone._id = clone.id
        delete clone.id

        return await this.customer.create(clone)
    }

    async update(data: CustomerDto): Promise<ICustomer> {
        return await this.customer.findOneAndUpdate({
            _id: data.id,
            deleteFlag: false
        }, data,
        { new: true })
    }

    async delete(id: string): Promise<ICustomer>{
        return await this.customer.findByIdAndUpdate(id,
        {
            deleteFlag: true,
            updatedDate: new Date()
        },
        { new: true })
    }

    async findById(id: string): Promise<ICustomer> {
        return await this.customer.findOne({
            _id: id,
            deleteFlag: false 
        })
    }

    async findByMobileNo(mobileNo: number): Promise<ICustomer> {
        return await this.customer.findOne({
            mobileNo,
            deleteFlag: false
        })
    }

    async findByEmail(email: string): Promise<ICustomer> {
        return await this.customer.findOne({
            email,
            deleteFlag: false
        })
    }

    async findByEmailAndPassword(email: string, pass: string): Promise<ICustomer | any> {
        const customer = await this.customer.findOne({
            email,
            deleteFlag: false
        }).select("+password")
        if(!customer) {
            return customer
        }

        const validPassword = bcrypt.compareSync(pass, customer.password)
        if(!validPassword) {
            return undefined
        }
        
        const withoutPassword = JSON.parse(JSON.stringify(customer))
        delete withoutPassword.password
        return withoutPassword
    }

    async getLastIdCustomer(): Promise<ICustomer> {
        return await this.customer.findOne({}).sort({accountNo: -1})
    }
}