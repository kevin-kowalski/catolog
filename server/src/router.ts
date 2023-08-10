import express from 'express';
import * as objectController from './controllers/object.controller';
import * as categoryController from './controllers/category.controller';
import * as authController from './controllers/auth.controller';

// Set up router
const router = express.Router();

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/models', objectController.getAll);
router.get('/models/:id', objectController.getOne);
router.get('/models/category/:category', objectController.getByCategory);
router.post('/model', objectController.postOne);
router.delete('/model/:id', objectController.deleteOne);

router.get('/categories', categoryController.getAll);
router.post('/category', categoryController.postOne);
router.delete('/category/:id', categoryController.deleteOne);

router.delete('/category/model/:categoryId/:objectId', objectController.deleteOneFromCategory);


export default router;
