import { Model } from "mongoose";
import { InvoiceDto } from "../../dto/invoiceDto";
import invoiceModels, { IInvoice } from "../../models/invoiceModels";

export class InvoiceService {
    private product: Model<IInvoice>

    constructor() {
        this.product = invoiceModels
    }

    async create(data: InvoiceDto): Promise<IInvoice> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.product.create(clone)
    }

    async findById(id: string): Promise<IInvoice> {
        return await this.product.findById(id)
    }
}