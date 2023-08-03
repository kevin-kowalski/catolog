const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;

const db = {};
db.mongoose = mongoose;
db.url = url;

module.exports = db;
