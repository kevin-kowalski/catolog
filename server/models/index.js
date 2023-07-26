const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/wee-three';

const db = {};
db.mongoose = mongoose;
db.url = url;

module.exports = db;
