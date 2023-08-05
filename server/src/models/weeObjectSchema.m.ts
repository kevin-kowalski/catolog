import mongoose from 'mongoose';

// Schema for the 3d objects
const weeObjectSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  glb: String,
  source: String,
  category: String,
  scale: mongoose.Types.Decimal128,
  date: { type: Date, default: Date.now },
});

// Create model from schema
const WeeObject = mongoose.model('WeeObject', weeObjectSchema);

export default WeeObject;
