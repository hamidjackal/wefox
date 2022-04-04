import { SigninUser } from '../signin';
import { User } from '../../models/user';
import { Password } from '../password';
import { getTokens } from '../getTokens';
import { BadRequestError } from '../../../core/errors/bad-request-error';

jest.mock('../../models/user');
jest.mock('../password');
jest.mock('../getTokens');

const mockedPassword = Password as jest.Mocked<typeof Password>;
const mockedGetToken = getTokens as jest.MockedFunction<typeof getTokens>;
const mockedUser = User as jest.Mocked<typeof User>;

describe('Signin unit tests', () => {
  test('Sign in user with propper credentials', async () => {
    mockedPassword.compare.mockReturnValue(
      (async () => {
        return true;
      })(),
    );

    mockedUser.findOne.mockReturnValue(
      //@ts-ignore
      (async () => {
        return { password: 'password', email: 'test@test.com', id: '123456' };
      })(),
    );

    mockedGetToken.mockReturnValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const body = {
      email: 'test@test.com',
      password: 'password',
    };
    const signinUser = new SigninUser(body);
    const signedinUser = await signinUser.signin();

    expect(signedinUser.accessToken).toBe('accessToken');
    expect(signedinUser.refreshToken).toBe('refreshToken');
    expect(signedinUser.email).toBe('test@test.com');
    expect(signedinUser.id).toBe('123456');
  });

  test('Sign in user with invalid email', async () => {
    mockedPassword.compare.mockReturnValue(
      (async () => {
        return true;
      })(),
    );

    mockedUser.findOne.mockReturnValue(
      //@ts-ignore
      (async () => {
        return null;
      })(),
    );

    mockedGetToken.mockReturnValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const body = {
      email: 'test@test.com',
      password: 'password',
    };
    const signinUser = new SigninUser(body);

    await expect(signinUser.signin()).rejects.toEqual(
      new BadRequestError('Invalid Credentials'),
    );
  });

  test('Sign in user with invalid password', async () => {
    mockedPassword.compare.mockReturnValue(
      (async () => {
        return false;
      })(),
    );

    mockedUser.findOne.mockReturnValue(
      //@ts-ignore
      (async () => {
        return { password: 'password', email: 'test@test.com', id: '123456' };
      })(),
    );

    mockedGetToken.mockReturnValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    const body = {
      email: 'test@test.com',
      password: 'invalidPassword',
    };
    const signinUser = new SigninUser(body);

    await expect(signinUser.signin()).rejects.toEqual(
      new BadRequestError('Invalid Credentials'),
    );
  });
});
