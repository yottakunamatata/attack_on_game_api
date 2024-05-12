import { Request, Response } from 'express';
import User from '../models/User';

const userController = {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(200).json({ status: true, data: user });
  },
};

export default userController;
