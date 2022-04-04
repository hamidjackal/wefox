import { SignupUser } from '../signup';
import { User } from '../../models/user';
import { getTokens } from '../getTokens';
import { BadRequestError } from '../../../core/errors/bad-request-error';

jest.mock('../../models/user');
jest.mock('../getTokens');

const mockedGetToken = getTokens as jest.MockedFunction<typeof getTokens>;
const mockedUser = User as jest.Mocked<typeof User>;

describe('Signup unit tests', () => {
  test('Sign up user with propper credentials', async () => {
    mockedUser.findOne.mockReturnValue(
      //@ts-ignore
      (async () => {
        return null;
      })(),
    );

    mockedUser.build.mockReturnValue({
      //@ts-ignore
      save: async () => {
        return true;
      },
      email: 'test@test.com',
      id: '123456',
    });

    mockedGetToken.mockReturnValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const body = {
      email: 'test@test.com',
      password: 'password',
    };
    const signupUser = new SignupUser(body);
    const signedupUser = await signupUser.signup();

    expect(signedupUser.accessToken).toBe('accessToken');
    expect(signedupUser.refreshToken).toBe('refreshToken');
    expect(signedupUser.email).toBe('test@test.com');
    expect(signedupUser.id).toBe('123456');
  });

  test('Sign up user with existing email', async () => {
    mockedUser.findOne.mockReturnValue(
      //@ts-ignore
      (async () => {
        return { password: 'password', email: 'test@test.com', id: '123456' };
      })(),
    );

    const body = {
      email: 'test@test.com',
      password: 'password',
    };
    const signupUser = new SignupUser(body);

    await expect(signupUser.signup()).rejects.toEqual(
      new BadRequestError('Email in use'),
    );
  });
});
