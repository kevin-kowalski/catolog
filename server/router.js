'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/weeObjects');

router.get('/models', ctrl.getAll);
router.get('/models/:title', ctrl.getObject);
router.get('/models/category/:category', ctrl.getCategory);

module.exports = router;
