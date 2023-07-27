'use strict';

const weeObjects = require('../models/weeObjects');

async function getObject(req, res) {
  try {
    const objName = req.params.name;
    if (!objName) {
      res.status(400);
      res.send('No object title provided in data.');
    }
    const weeObj = await weeObjects.getOne(req.params.name);
    res.send(weeObj);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

module.exports = {
  getObject,
};
