'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/weeObjects');

router.get('/model/:title', ctrl.getObject);
router.get('/category/:name', ctrl.getCategory);
router.get('/all', ctrl.getAll);

module.exports = router;
