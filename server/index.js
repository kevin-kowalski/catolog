'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./router');
const db = require('./models/index');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

(async () => {
  await db.mongoose.connect(db.url);
  console.log('Connected to Mongo');
  app.listen(3001, () => {
    console.log('Server up');
  });
})();
