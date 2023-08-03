import mongoose from 'mongoose';

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

const WeeObject = mongoose.model('WeeObject', weeObjectSchema);

export default WeeObject;
