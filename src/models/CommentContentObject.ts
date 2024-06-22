import { Schema, Document, model } from 'mongoose';

export interface ICommentContentObject extends Document {
  author: Schema.Types.ObjectId;
  eventId: String;
  storeId: Schema.Types.ObjectId;
  content: String;
  createAt: Date;
  type: String;
  messageId: Schema.Types.ObjectId;
}

const commentContentObjectSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  eventId: {
    type: String,
    ref: 'events',
    required: true,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'stores'
  },
  content: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, require: true },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'commentContentObject'
  }
});

export const commentContentObject = model<ICommentContentObject>(
  'CommentContentObject',
  commentContentObjectSchema,
  'commentContentObject',
);
