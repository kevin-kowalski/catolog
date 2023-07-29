'use strict';
const mongoose = require('mongoose');

const weeObjSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  glb: String,
  source: String,
  category: String,
  scale: mongoose.Types.Decimal128,
  ypos: mongoose.Types.Decimal128,
  date: { type: Date, default: Date.now },
});

const WeeObj = mongoose.model('WeeObj', weeObjSchema);

module.exports = WeeObj;
