import { Model } from "mongoose";
import { OrderDto } from "../../dto/orderDto";
import orderModels, { IOrder } from "../../models/orderModels";

export class OrderSerivce {
    private order: Model<IOrder>

    constructor() {
        this.order = orderModels
    }

    async create(data: OrderDto): Promise<IOrder> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.order.create(clone)
    }

    async findById(id: string): Promise<IOrder> {
        return await this.order.findById(id)
    }

    async findByTrxRefNo(trxRefNo: string): Promise<IOrder> {
        return await this.order.findOne({
            trxRefNo
        })
    }

    async findLatestTrxRefNoByAccountNo(accountNo: string): Promise<IOrder> {
        return await this.order.findOne({accountNo}).sort({trxRefNo: -1})
    }
}