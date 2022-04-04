import { Response, Request } from 'express';
import { errorResponse } from '../../core/services/errorResponse';
import { successResponse } from '../../core/services/successResponse';
import { SignupUser } from '../services/signup';

const signup = () => async (req: Request, res: Response) => {
  try {
    const signupUser = new SignupUser(req.body);
    const createdUser = await signupUser.signup();
    res.status(201).json(successResponse(createdUser));
  } catch (err) {
    res.json(errorResponse(err as Error));
  }
};

export { signup as signupRouter };
