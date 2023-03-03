import { Document, model, Schema } from 'mongoose';

export interface IOrder extends Document {
    id: string;
    trxRefNo: string;
    accountNo: string;
    productId: string;
    amount: number;
    fee: number;
    status: string;
    type: string;
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
    productId: { type: String },
    amount: { type: Number },
    fee: { type: Number },
    status: { type: String },
    updatedDate: { type: Date },
    type: {type: String},
    currency: { type: String },
    submittedDate: { type: Date },
    processingDate: { type: Date },
    completedDate: { type: Date },
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