import { Model } from "mongoose";
import { OrderDto } from "../../dto/orderDto";
import orderModels, { IOrder } from "../../models/orderModels";
import { v4 as uuid } from 'uuid';
import { OrderType } from "../../enum";

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

    async createBulk(datas: OrderDto[]): Promise<IOrder[]> {
        const clone = JSON.parse(JSON.stringify(datas))
        for(const data of clone) {
            data._id = uuid()
        }

        return await this.order.insertMany(datas)
    }

    async update(data: OrderDto): Promise<IOrder> {
        return await this.order.findOneAndUpdate({trxRefNo: data.trxRefNo}, data, {new: true})
    }

    async updateByPaymentId(data: OrderDto): Promise<IOrder> {
        return await this.order.findOneAndUpdate({paymentId: data.paymentId}, data, {new: true})
    }

    async findById(id: string): Promise<IOrder> {
        return await this.order.findById(id)
    }

    async findAllByCifId(cifId: string, page?: number, limit?: number): Promise<IOrder[]> {
        return await this.order.find({
            cifId
        })
    }

    async findByPaymentId(paymentId: string, type: OrderType): Promise<IOrder> {
        return await this.order.findOne({
            paymentId,
            type
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