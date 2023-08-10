import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
};

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<UserDocument>('User', userSchema);