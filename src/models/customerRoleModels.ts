import { Document, model, Schema } from 'mongoose';

export interface ICustomerRole extends Document {
    name: string;
    rules: string;
    deleteFlag: boolean;
}

const customerRoleSchema = new Schema<ICustomerRole>({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        required: false,
        default: ""
    },
    deleteFlag: {
        type: Boolean,
        required: false,
        default: false
    }
},{
    versionKey: false,
    virtuals: true
})

customerRoleSchema.virtual('id').get(function() {
    return this._id
})

export default model<ICustomerRole>('role', customerRoleSchema)