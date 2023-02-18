import { model, Schema } from 'mongoose';
import { customerModelsDoc } from '../interfaces';
import bcrypt from 'bcrypt';

const customerSchema = new Schema<customerModelsDoc>({
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
    }
})

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
});

export default model('customer', customerSchema)