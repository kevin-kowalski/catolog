import { Schema, model, Document, Types } from 'mongoose';

export interface WObjectDocument extends Document {
  title: string;
  author: string;
  description: string;
  glb: string;
  source: string;
  categories: string[];
  scale: number;
  date: { type: DateConstructor; default: number; };
};

// Schema for the 3d objects
const objectSchema = new Schema<WObjectDocument>({
  title: String,
  author: String,
  description: String,
  glb: String,
  source: String,
  categories: [String],
  scale: Types.Decimal128,
  date: { type: Date, default: Date.now() },
});

// Create model from schema
export const WObject = model<WObjectDocument>('WObject', objectSchema);
