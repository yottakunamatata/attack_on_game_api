import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
const { dbUserName, dbPassword, dbName } = process.env;
const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.4va9e.mongodb.net/${dbName}`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
}

export default connectDB;
