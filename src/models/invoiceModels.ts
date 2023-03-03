import { Document, model, Schema } from "mongoose";

export interface IInvoice extends Document {
    id: string;
    trxRefNo: string;
    xenditRefNo: string;
    status: string;
    merchantName: string;
    amount: number;
    createdDate: Date;
    updatedDate: Date;
    payerEmail: string;
    description: string;
    paymentId: string;
    paidAmount: number;
    paymentMethod: string;
    ewalletType: string;
    currency: string;
    paidAt: Date;
    paymentChannel: string;
    paymentMethodId: string;
    invoiceUrl: string;
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>
}

const invoiceSchema = new Schema<IInvoice>({
    _id: String,
    status: { type: String, required: true },
    trxRefNo: { type: String, unique: true, required: true },
    xenditRefNo: { type: String, unique: true, required: true },
    merchantName: String,
    amount: { type: Number, required: true },
    createdDate: Date,
    updatedDate: Date,
    payerEmail: String,
    description: String,
    paymentId: String,
    paidAmount: Number,
    paymentMethod: String,
    ewalletType: String,
    currency: String,
    paidAt: Date,
    paymentChannel: String,
    paymentMethodId: String,
    invoiceUrl: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }]
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

export default model<IInvoice>('invoice', invoiceSchema)