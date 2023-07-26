'use strict';

const WeeObj = require('./weeobjects_schema.js');

exports.getOne = async (name) => {
  try {
    const weeObj = await WeeObj.findOne({ name });
    if (!weeObj) throw new Error('No object found');
    return weeObj;
  } catch (err) {
    console.error(err);
  }
};
