import { model, Schema } from 'mongoose';
import { ICustomer } from '../interfaces';
import bcrypt from 'bcrypt';

const customerSchema = new Schema<ICustomer>({
    _id: {
        type: String
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
    }
},{
    timestamps: true
})

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
});

export default model<ICustomer>('customer', customerSchema)