import { Router } from 'express';
import NotificationController from '../controllers/NotificationController.js';

const router = new Router();

router.get('/user/:userId', NotificationController.getAllByUserId);
router.post('/', NotificationController.create);
router.patch('/:id/mark-seen', NotificationController.markAsSeen);
router.delete('/:id', NotificationController.delete);

export { router as notificationRoutes };
