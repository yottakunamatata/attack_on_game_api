import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { localAuthenticator } from '../middlewares/auth';
import UserRouter from './user';
import PlayerRouter from './player';
const router = Router();

router.use('/user', UserRouter);
router.use('/player', PlayerRouter);
router.post('/login', localAuthenticator, generateJWT);

export default router;
