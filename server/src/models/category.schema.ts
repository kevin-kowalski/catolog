import { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  title: string;
  models: string[];
};

// Schema for the 3d objects
const categorySchema = new Schema<CategoryDocument>({
  title: { type: String, required: true, unique: true },
  models: { type: [String] },
});

// Create model from schema
export const Category = model<CategoryDocument>('Category', categorySchema);
