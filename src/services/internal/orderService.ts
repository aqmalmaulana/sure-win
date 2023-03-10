import { Model } from "mongoose";
import { OrderDto } from "../../dto/orderDto";
import orderModels, { IOrder } from "../../models/orderModels";
import { v4 as uuid } from 'uuid';

export class OrderSerivce {
    private order: Model<IOrder>

    constructor() {
        this.order = orderModels
    }

    async create(data: OrderDto): Promise<IOrder> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id = uuid()

        return await this.order.create(clone)
    }

    async update(data: OrderDto): Promise<IOrder> {
        return await this.order.findOneAndUpdate({trxRefNo: data.trxRefNo}, data)
    }

    async findById(id: string): Promise<IOrder> {
        return await this.order.findById(id)
    }

    async findAllByCifId(cifId: string, page?: number, limit?: number): Promise<IOrder[]> {
        // if(page && limit) {
        //     page = 0
        // }

        if(!limit) 
        return await this.order.find({
            cifId
        })
    }

    async findByTrxRefNo(trxRefNo: string): Promise<IOrder> {
        return await this.order.findOne({
            trxRefNo
        })
    }

    async findLatestTrxRefNoByCifIdAndType(cifId: string, type: string): Promise<IOrder> {
        return await this.order.findOne({
            cifId,
            type
        }).sort({trxRefNo: -1})
    }
}