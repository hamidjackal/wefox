import { refreshToken } from '../refreshToken';
import jwt from 'jsonwebtoken';
import { getTokens } from '../getTokens';
import { BadRequestError } from '../../../core/errors/bad-request-error';

jest.mock('../getTokens');
jest.mock('jsonwebtoken');

const mockedGetToken = getTokens as jest.MockedFunction<typeof getTokens>;
const mockedJWT = jwt as jest.Mocked<typeof jwt>;

describe('Refresh token unit tests', () => {
  test('Refresh token with propper credentials', async () => {
    mockedJWT.verify.mockReturnValue(
      //@ts-ignore
      (() => {
        return { id: '123456', email: 'test@test.com' };
      })(),
    );

    mockedGetToken.mockReturnValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const refreshedToken = await refreshToken('test@test.com', 'token');

    expect(refreshedToken.accessToken).toBe('accessToken');
    expect(refreshedToken.refreshToken).toBe('refreshToken');
    expect(refreshedToken.email).toBe('test@test.com');
    expect(refreshedToken.id).toBe('123456');
  });

  test('Refresh with invalid token', async () => {
    mockedJWT.verify.mockReturnValue(
      //@ts-ignore
      (async () => {
        return { id: '123456', email: 'invalidTest@test.com' };
      })(),
    );

    await expect(refreshToken('test@test.com', 'roken')).rejects.toEqual(
      new BadRequestError('Invalid token'),
    );
  });
});
