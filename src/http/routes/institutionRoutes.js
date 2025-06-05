import { Router } from 'express';
import InstitutionController from '../controllers/InstitutionController.js';

const router = new Router();

router.get('/', InstitutionController.getAll);

export { router as institutionRoutes };
