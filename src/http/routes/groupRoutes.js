import { Router } from 'express';
import GroupController from '../controllers/GroupController.js';

const router = new Router();

router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getById);
router.get('/access/:accessCode', GroupController.getByAccessCode);
router.post('/', GroupController.create);
router.patch('/:id', GroupController.update);
router.delete('/:id', GroupController.delete);

export { router as groupRoutes };
