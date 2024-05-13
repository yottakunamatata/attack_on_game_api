import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hash } from 'bcrypt';

const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(409).json({ status: false, message: 'User already exists' });
        return;
      }
      const hashedPassword = await hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      res.status(200).json({ status: true, menubar: 'User created' });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
