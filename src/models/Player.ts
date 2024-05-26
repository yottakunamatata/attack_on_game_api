
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPlayer extends Document {
  name: String
  user: Types.ObjectId
  phone: String
  avatar: String
  preferGame: Array<String>
}


const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  preferGame: {
    type: [String]
    , required: true
  }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);