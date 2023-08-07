import express from 'express';
import * as weeObjectController from './controllers/weeObject.c';
import * as weeCategoryController from './controllers/weeCategory.c';

// Set up router
const router = express.Router();

// Routes
router.get('/models', weeObjectController.getAll);
router.get('/models/:id', weeObjectController.getObject);
router.get('/models/category/:category', weeObjectController.getCategory);
router.post('/model', weeObjectController.postOne);

router.get('/categories', weeCategoryController.getAll);
router.post('/category', weeCategoryController.postOne);

export default router;
