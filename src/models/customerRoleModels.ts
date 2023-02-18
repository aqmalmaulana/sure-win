import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICustomerRole extends Document {
    _id?: string;
    name?: string;
    rules?: string;
    delete_flag?: boolean;
}

const customerRoleSchema = new Schema<ICustomerRole>({
    _id: {
        type: String
    },
    name: {
        type: String,
        default: ""
    },
    rules: {
        type: String,
        required: true
    },
    delete_flag: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

export default model<ICustomerRole>('role', customerRoleSchema)