import { Response, Request } from 'express';
import { errorResponse } from '../../core/services/errorResponse';
import { successResponse } from '../../core/services/successResponse';
import { refreshToken } from '../services/refreshToken';

const refreshUserToken = () => async (req: Request, res: Response) => {
  try {
    const refreshedToken = await refreshToken(
      req.body.email,
      req.body.refreshToken,
    );
    res.status(200).json(successResponse(refreshedToken));
  } catch (err) {
    res.json(errorResponse(err as Error));
  }
};

export { refreshUserToken as refreshTokenRouter };
