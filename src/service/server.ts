import app from '../app';
import { Request, Response } from 'express';
import connectDB from '../utils/connectDB';
import UserRouter from '../service/user';
import Router from '../routers';
import passport from 'passport';
const PORT = process.env.PORT || 3000;

connectDB();

app.use(passport.initialize());

app.use('/user', UserRouter);
app.use('/api', Router);

app.listen(PORT, () => {
  console.log(`你現在收看的是http://localhost:${PORT}`);
});
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '莎莎給油!' });
});
