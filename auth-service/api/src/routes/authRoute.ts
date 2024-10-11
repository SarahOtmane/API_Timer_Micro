import { Router } from 'express';
import * as userController from '../controllers/authController';

const router = Router();

router.post('/register', userController.registerAUser);
router.post('/login', userController.loginUser);

export default router;
