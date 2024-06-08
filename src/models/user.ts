import { Schema, Document, model } from 'mongoose';

export enum UserRole {
  PLAYER = 'player',
  STORE = 'store',
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  createAt: Date;
  updateAt: Date;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  emailCode: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false,
  },

  updateAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

// Add updatedAt field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const User = model<IUser>('users', userSchema);
