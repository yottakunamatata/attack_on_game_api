import { Router } from 'express';
import passport from '../config/passport';
const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);
export default router;
