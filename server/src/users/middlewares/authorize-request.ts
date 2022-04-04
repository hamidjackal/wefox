import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../../core/errors/not-authorized-error';
import { UserPayload } from '../interfaces/user-payload.interface';
import { User } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.token) {
    next(new NotAuthorizedError());
  }

  const payload = jwt.verify(
    req.headers.token as string,
    process.env.JWT_ACCESS_KEY!,
  ) as UserPayload;
  const existingUser = await User.findById(payload.id);
  if (!existingUser) {
    next(new NotAuthorizedError());
  } else {
    req.currentUser = { id: existingUser.id, email: existingUser?.email };
  }
  next();
};
