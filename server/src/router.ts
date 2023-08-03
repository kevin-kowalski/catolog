import express from 'express';
import * as controller from './controllers/weeObject.c';

const router = express.Router();

router.get('/models', controller.getAll);
router.get('/models/:title', controller.getObject);
router.get('/models/category/:category', controller.getCategory);

export default router;
