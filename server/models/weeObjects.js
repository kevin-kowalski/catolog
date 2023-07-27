'use strict';

const WeeObj = require('./weeobjects_schema.js');

exports.getOne = async (name) => {
  try {
    const weeObj = await WeeObj.findOne({
      title: { $regex: name, $options: 'i' },
    });
    if (!weeObj) throw new Error('No object found');
    return weeObj;
  } catch (err) {
    console.error(err);
  }
};

exports.getCategory = async (name) => {
  try {
    const categoryObjects = await WeeObj.find({
      category: { $regex: name, $options: 'i' },
    }).exec();
    if (!categoryObjects) throw new Error('No objects found');
    return categoryObjects;
  } catch (err) {
    console.error(err);
  }
};

exports.getAll = async () => {
  try {
    const allObjects = await WeeObj.find({});
    if (!allObjects) throw new Error('No objects found');
    return allObjects;
  } catch (err) {
    console.error(err);
  }
};
