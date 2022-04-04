import express from 'express';
import { json } from 'body-parser';
import { errorHandler } from './core/middlewares/error-handler';

import { userRouter } from './users/controllers';
import { addressRouter } from './addressServices/controllers';
import { config } from 'dotenv';

config();
const app = express();
app.set('trust proxy', true);
app.use(json());

app.use('/api/users', userRouter);
app.use('/api/address-services', addressRouter);

app.all('*', async (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.use(errorHandler);

export { app };
