import { Document, model, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export interface IUserGame extends Document {
    id: string;
    cifId: string;
    gameId: string;
    productId: string;
    spent: string;
    result: string;
}

const useGameSchema = new Schema<IUserGame>({
    _id: {
        type: String
    },
    cifId: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    spent: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true,
        enum: ["PENDING", "WIN", "LOSS"]
    },
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

export default model<IUserGame>('userGame', useGameSchema)