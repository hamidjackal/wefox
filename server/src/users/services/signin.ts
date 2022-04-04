import { User, UserAttrs } from '../models/user';
import { BadRequestError } from '../../core/errors/bad-request-error';
import { Password } from './password';
import { UserStatus } from '../models/user-status.enum';
import { getTokens } from './getTokens';

export class SigninUser {
  private email: string;
  private password: string;

  constructor(body: UserAttrs) {
    this.email = body.email;
    this.password = body.password;
  }

  async signin() {
    const existingUser = await this.getUserByEmail();
    await this.validatePassword(existingUser.password, this.password);
    return this.generateTokens(existingUser.id, existingUser.email);
  }

  private async getUserByEmail() {
    const existingUser = await User.findOne({
      email: this.email,
      status: UserStatus.ACTIVE,
    });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }
    return existingUser;
  }

  private async validatePassword(
    existingPassword: string,
    inputPassword: string,
  ): Promise<void> {
    const passwordsMatch = await Password.compare(
      existingPassword,
      inputPassword,
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
  }

  private generateTokens(id: string, email: string) {
    const { accessToken, refreshToken } = getTokens({ id, email });

    return {
      accessToken,
      refreshToken,
      email,
      id,
    };
  }
}
