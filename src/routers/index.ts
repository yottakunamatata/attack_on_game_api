import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { localAuthenticator } from '../middlewares/auth';
import UserRouter from '@/routers/user';
import PlayerRouter from './player';
import EventRouter from '@/routers/event';
const router = Router();

router.use('/user', UserRouter);
router.use('/player', PlayerRouter);
router.post('/login', localAuthenticator, generateJWT);
router.use('/event', EventRouter);
router.get('/profile', jwtAuthenticator, (req, res) => {
    res.status(200).json({ user: req.user });
});
export default router;
