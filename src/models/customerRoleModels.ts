import { Document, model, Schema } from 'mongoose';

export interface ICustomerRole extends Document {
    id: string;
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

export default model<ICustomerRole>('role', customerRoleSchema)