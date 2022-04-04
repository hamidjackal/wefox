import { Response, Request } from 'express';
import { errorResponse } from '../../core/services/errorResponse';
import { successResponse } from '../../core/services/successResponse';
import { getWeather } from '../services/getWeather';

const weather = () => async (req: Request, res: Response) => {
  try {
    const weather = await getWeather(req.body.lon, req.body.lat);
    res.status(200).json(successResponse(weather));
  } catch (err) {
    res.json(errorResponse(err as Error));
  }
};

export { weather as weatherRouter };
