import { Model } from "mongoose";
import { FundsDto } from "../../dto/fundsDto";
import fundsModels, { IFunds } from "../../models/fundsModels";
import { v4 as uuid } from 'uuid';

export class FundService {
    private fund: Model<IFunds>

    constructor() {
        this.fund = fundsModels
    }

    async create(data: FundsDto): Promise<IFunds> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id = uuid()

        return await this.fund.create(clone)
    }

    async findFundById(id: string): Promise<IFunds> {
        return this.fund.findById(id)
    }

    async findFundByCifId(cifId: string): Promise<IFunds> {
        return this.fund.findOne({
            cifId
        })
    }

}