'use strict';

const weeObjects = require('../models/weeObjects');

async function getObject(req, res) {
  try {
    const objName = req.params.title;
    if (!objName) {
      res.status(400);
      res.send('No object title provided in data.');
    }
    const weeObj = await weeObjects.getOne(objName);
    res.send(weeObj);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

async function getCategory(req, res) {
  try {
    const catName = req.params.category;
    if (!catName) {
      res.status(400);
      res.send('No category name provided in data.');
    }
    const categoryObjects = await weeObjects.getCategory(catName);
    res.send(categoryObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

async function getAll(req, res) {
  try {
    res.send(await weeObjects.getAll());
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

module.exports = {
  getObject,
  getCategory,
  getAll,
};
