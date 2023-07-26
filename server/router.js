'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/weeObjects');

router.get('/model:name', ctrl.getModel);

module.exports = router;
