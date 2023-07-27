'use strict';
const mongoose = require('mongoose');

const weeObjSchema = new mongoose.Schema({
  title: String,
  author: String,
  tsx: Buffer,
  glb: Buffer,
  source: String,
  category: String,
  scale: Number,
  date: { type: Date, default: Date.now },
});

const WeeObj = mongoose.model('WeeObj', weeObjSchema);

module.exports = WeeObj;
