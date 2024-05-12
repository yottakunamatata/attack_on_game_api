import passport from 'passport';
import { Strategy as LoacalStrategy } from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

import User from '../models/User';
import { config } from 'dotenv';
config();

// Loacl Strategy

passport.use(
  new LoacalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// JWT Strategy
const jwtOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
  passReqToCallback: false,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

export default passport;
