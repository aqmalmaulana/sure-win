import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICustomer extends Document {
    id: string;
    name: string;
    mobileNo: number;
    email: string;
    password: string;
    createdDate: Date;
    updatedDate: Date;
    deleteFlag: boolean;
    roleId: string;
    accountNo: string;
}

const customerSchema = new Schema<ICustomer>({
    _id: {
        type: String,
    },
    name: {
        type: String,
        default: ""
    },
    mobileNo:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    deleteFlag: {
        type: Boolean,
        default: false
    },
    roleId: {
        type: String,
    },
    accountNo: {
        type: String,
        unique: true
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {
        type: Date
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

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
});

export default model<ICustomer>('customer', customerSchema)