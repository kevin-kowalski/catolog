import mongoose from 'mongoose';

// Schema for the 3d objects
const weeCategory = new mongoose.Schema({
  title: String,
});

// Create model from schema
const WeeCategory = mongoose.model('WeeCategory', weeCategory);

export default WeeCategory;
