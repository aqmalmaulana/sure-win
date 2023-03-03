import { Document, model, Schema } from 'mongoose';

export interface ICustomerXendit extends Document {
    id: string;
    accountNo: string;
    type: string;
}

const customerXenditSchema = new Schema<ICustomerXendit>({
    _id: {
        type: String
    },
    accountNo:{
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }
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

export default model<ICustomerXendit>('customerXendit', customerXenditSchema)