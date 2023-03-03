import { Document, model, Schema } from 'mongoose';

export interface IProduct extends Document {
    id: string;
    name: string;
    price: number;
    discount: number;
    currency: string;
    description: string;
    category: string;
    isActive: boolean;
    deleteFlag: boolean;
}

const productSchema = new Schema<IProduct>({
    _id: String,
    name: String,
    price: Number,
    discount: Number,
    currency: {type: String, default: "IDR"},
    description: String,
    category: String,
    isActive: Boolean,
    deleteFlag: {type: Boolean, default: false}
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

export default model<IProduct>('product', productSchema)