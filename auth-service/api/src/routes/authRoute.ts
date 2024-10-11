import { Router } from 'express';
import * as userController from '../controllers/authController';

const router = Router();

router.post('/register', userController.registerAUser);

export default router;
