import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICustomer extends Document {
    _id?: string;
    name?: string;
    mobileNo: number;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteFlag?: boolean;
    roleId?: string;
    accountNo?: string;
}

const customerSchema = new Schema<ICustomer>({
    _id: {
        type: String
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
    password: {
        type: String,
        required: true
    },
    deleteFlag: {
        type: Boolean,
        default: false
    },
    roleId: {
        type: String,
    },
    accountNo: {
        type: String
    }
},{
    timestamps: true,
    versionKey: false
})

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
});

export default model<ICustomer>('customer', customerSchema)