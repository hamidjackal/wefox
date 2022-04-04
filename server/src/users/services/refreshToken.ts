import { getTokens } from './getTokens';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../interfaces/user-payload.interface';
import { BadRequestError } from '../../core/errors/bad-request-error';

const refreshToken = async (email: string, refreshToken: string) => {
  const { id, email: tokenEmail } = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY!,
  ) as UserPayload;

  if (email !== tokenEmail) {
    throw new BadRequestError('Invalid token');
  }

  const { accessToken, refreshToken: newRefreshToken } = getTokens({
    id,
    email,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
    email,
    id,
  };
};

export { refreshToken };
