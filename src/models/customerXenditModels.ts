import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICustomerXendit extends Document {
    _id?: string;
    cifId?: string;
    accountNo?: string;
    type?: string;
}

const customerXenditSchema = new Schema<ICustomerXendit>({
    _id: {
        type: String
    },
    cifId: {
        type: String,
        default: "",
        unique: true
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
    timestamps: true,
    versionKey: false
})

export default model<ICustomerXendit>('customerXendit', customerXenditSchema)