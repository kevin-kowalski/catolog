'use strict';
const mongoose = require('mongoose');

const weeObjSchema = new mongoose.Schema({
  title: String,
  author: String,
  jsx: Buffer,
  glb: Buffer,
  source: String,
  category: String,
});

const WeeObj = mongoose.model('WeeObj', weeObjSchema);

module.exports = WeeObj;
