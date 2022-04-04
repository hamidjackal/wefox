import { Response, Request } from 'express';
import { errorResponse } from '../../core/services/errorResponse';
import { successResponse } from '../../core/services/successResponse';
import { SigninUser } from '../services/signin';

const signin = () => async (req: Request, res: Response) => {
  try {
    const signinUser = new SigninUser(req.body);
    const signedinUser = await signinUser.signin();
    res.status(200).json(successResponse(signedinUser));
  } catch (err) {
    console.log('ERROR----------', err);
    res.status(400).json(errorResponse(err as Error));
  }
};

export { signin as signinRouter };
