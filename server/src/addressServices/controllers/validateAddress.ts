import { Response, Request } from 'express';
import { successResponse } from '../../core/services/successResponse';
import { errorResponse } from '../../core/services/errorResponse';
import { validateAddress } from '../services/validateAddress';

const validateUserAddress = () => async (req: Request, res: Response) => {
  try {
    const isAddressValid = await validateAddress(req.body);
    res.status(200).json(successResponse({ isAddressValid }));
  } catch (err) {
    res.json(errorResponse(err as Error));
  }
};

export { validateUserAddress as validateAddressRouter };
