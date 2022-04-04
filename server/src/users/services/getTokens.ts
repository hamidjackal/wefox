import jwt from 'jsonwebtoken';
import { refreshTokenLife, tokenLife } from '../../config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { Tokens } from '../interfaces/tokens.interface';

const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_KEY!, {
    expiresIn: tokenLife,
  });
};

const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY!, {
    expiresIn: refreshTokenLife,
  });
};

const getTokens = (payload: TokenPayload): Tokens => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

export { getTokens };
