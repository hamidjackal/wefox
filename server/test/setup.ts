import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../src/users/models/user';

declare global {
  function signin(): Promise<string>;
}

let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'asdfgh';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const createdUser = await User.create({
    email: 'test@test.com',
    password: 'password',
  });
  const payload = {
    id: createdUser._id,
    email: createdUser.email,
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_KEY!);
};
