import { Model } from "mongoose";
import { ICustomerXenditDto } from "../../dto/customerXenditDto";
import customerXenditModels, { ICustomerXendit } from "../../models/customerXenditModels";

export class CustomerXenditService {
    private customer: Model<ICustomerXendit>

    constructor() {
        this.customer = customerXenditModels
    }

    async create(data: ICustomerXenditDto): Promise<ICustomerXenditDto> {
        return await this.customer.create(data)
    }
}