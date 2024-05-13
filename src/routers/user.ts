import { Router } from 'express';
import userController from '../controllers/userController';
import { jwtAuthenticator } from '../middlewares/auth';

const router = Router();

router.post('/', userController.create);
router.put('/:id', jwtAuthenticator, userController.updated);
router.get('/:id', jwtAuthenticator, userController.getById);

export default router;
