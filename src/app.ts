import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import storeRouter from './routes/storeRouter';

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
console.log(process.env.dbName);
const DB = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.2jethgx.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const app: Application = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB Atlas資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api', storeRouter);

export default app;
