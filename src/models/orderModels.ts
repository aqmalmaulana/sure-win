import { Document, model, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export interface IOrder extends Document {
    id: string;
    cifId: string;
    trxRefNo: string;
    description: string;
    priceAmount: string;
    priceCurrency: string;
    status: string;
    type: string;
    productId: string;
    gameId: string;
    payAddress: string;
    payAmount: string;
    payCurrency: string;
    purchaseId: string;
    paymentId: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
    _id: { type: String },
    cifId: { type: String, required: true },
    trxRefNo: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    priceAmount: { type: String, required: true },
    priceCurrency: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    productId: String,
    gameId: String,
    payAddress: String,
    payAmount: { type: String, required: true },
    payCurrency: { type: String, required: true },
    purchaseId: String,
    paymentId: String,
    createdAt: Date,
    updatedAt: Date
},{
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false
})

export default model<IOrder>('order', orderSchema)