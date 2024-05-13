import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';

const localAuthenticator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ status: false, message: 'No user found' });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

const jwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ status: false, message: 'No user found' });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

export { jwtAuthenticator, localAuthenticator };
