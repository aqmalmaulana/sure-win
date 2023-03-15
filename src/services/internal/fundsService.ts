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

    async update(data: FundsDto): Promise<IFunds> {
        return await this.fund.findOneAndUpdate({cifId: data.cifId}, data, {new: true})
    }

    async updateBulk(datas: FundsDto[]): Promise<void> {
        const bulkWriteOperations = []
        datas.forEach(async (data) => {
           bulkWriteOperations.push({
                updateOne: {
                    filter: {id: data.id},
                    update: data
                }
           })
        })

        await this.fund.bulkWrite(bulkWriteOperations)
    }

    async findFundById(id: string): Promise<IFunds> {
        return this.fund.findById(id)
    }

    async findFundByCifId(cifId: string): Promise<IFunds> {
        return this.fund.findOne({
            cifId
        })
    }

    async findFundByCifIds(cifIds: string[]): Promise<IFunds[]> {
        return this.fund.find({
            cifId: {$in: cifIds}
        })
    }
}