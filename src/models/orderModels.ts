import { Document, model, Schema } from 'mongoose';

export interface IOrder extends Document {
    trxRefNo: string;
    accountNo: string;
    amount: number;
    fee: number;
    status: string;
    type: string;
    invoiceUrl: string;
    currency: string;
    updatedDate: Date;
    submittedDate: Date;
    processingDate: Date;
    completedDate: Date;
}

const orderSchema = new Schema<IOrder>({
    _id: { type: String },
    trxRefNo: { type: String, unique: true },
    accountNo: { type: String },
    amount: {type: Number},
    fee: { type: Number },
    status: { type: String },
    updatedDate: { type: Date },
    type: {type: String},
    invoiceUrl: { type: String },
    currency: { type: String },
    submittedDate: { type: Date },
    processingDate: { type: Date },
    completedDate: { type: Date },
},{
    versionKey: false,
    virtuals: true
})

orderSchema.virtual('id').get(function() {
    return this._id
})

export default model<IOrder>('order', orderSchema)