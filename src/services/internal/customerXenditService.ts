import { Model } from "mongoose";
import { CustomerXenditDto } from "../../dto/customerXenditDto";
import customerXenditModels, { ICustomerXendit } from "../../models/customerXenditModels";

export class CustomerXenditService {
    private customer: Model<ICustomerXendit>

    constructor() {
        this.customer = customerXenditModels
    }

    async create(data: CustomerXenditDto): Promise<ICustomerXendit> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.customer.create(clone)
    }

    async findById(id: string): Promise<ICustomerXendit> {
        return await this.customer.findById(id)
    }

    async findByAccountNo(accountNo: string): Promise<ICustomerXendit> {
        return await this.customer.findOne({
            accountNo
        })
    }
}