import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export { router as userRoutes };
