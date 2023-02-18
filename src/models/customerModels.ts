import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ICustomer extends Document {
    _id?: string;
    name?: string;
    mobile_no: number;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    delete_flag?: boolean;
    roleId?: string;
}

const customerSchema = new Schema<ICustomer>({
    _id: {
        type: String
    },
    name: {
        type: String,
        default: ""
    },
    mobile_no:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
    roleId: {
        type: String,
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