import { Schema, Document, model } from 'mongoose';

export interface IComment extends Document {
  eventId: String;
  contents: Schema.Types.DocumentArray
  createAt: Date;
}

const commentSchema: Schema = new Schema({
  eventId: { type: String, require: true },
  contents: { type: Schema.Types.DocumentArray, require: true }
});

export const Comment = model<IComment>('Comments', commentSchema);
