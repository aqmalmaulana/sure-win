import { Document, model, Schema } from 'mongoose';

export interface ICustomerXendit extends Document {
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
    versionKey: false,
    virtuals: true
})

customerXenditSchema.virtual('id').get(function() {
    return this._id
})

export default model<ICustomerXendit>('customerXendit', customerXenditSchema)