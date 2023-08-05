import express from 'express';
import * as controller from './controllers/weeObject.c';

// Set up router
const router = express.Router();

// Routes
router.get('/models', controller.getAll);
router.get('/models/:title', controller.getObject);
router.get('/models/category/:category', controller.getCategory);

export default router;
