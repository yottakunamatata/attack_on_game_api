import { Router } from 'express';
import passport from '../config/passport';
import generateJWT from '../middlewares/generateJWT';
import { jwtAuthenticator } from '../middlewares/auth';
import UserRouter from './user';
const router = Router();

router.use('/user', UserRouter);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  generateJWT,
);

router.get('/profile', jwtAuthenticator, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;
