import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  name: string;
  email: string;
}

const generateJWT = (
  error: ErrorRequestHandler,
  req: Request<User>,
  res: Response,
  next: NextFunction,
) => {
  console.log('error', error);
  const { user } = req;
  if (!user) {
    res.status(401).json({ status: false, message: 'No user found' });
    next();
    return;
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.status(200).json({
    status: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
  next();
};

export default generateJWT;
