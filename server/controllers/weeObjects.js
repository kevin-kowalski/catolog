'use strict';

const weeObjects = require('../models/weeObjects');

async function getObject(req, res) {
  try {
    const weeObj = await weeObjects.getOne();
    res.send(weeObj);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

module.exports = {
  getObject,
};
