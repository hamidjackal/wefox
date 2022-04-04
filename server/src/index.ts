import mongoose from 'mongoose';
import { config } from 'dotenv';

import { app } from './app';

const start = async () => {
  config();
  console.log('MONGO URI----------', process.env.MONGO_URI);
  if (!process.env.JWT_ACCESS_KEY) {
    throw new Error('JWT_ACCESS_KEY must be defined');
  }

  if (!process.env.JWT_REFRESH_KEY) {
    throw new Error('JWT_REFRESH_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
