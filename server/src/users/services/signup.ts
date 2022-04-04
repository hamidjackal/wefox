import { User, UserAttrs } from '../models/user';
import { BadRequestError } from '../../core/errors/bad-request-error';
import { getTokens } from './getTokens';

export class SignupUser {
  private email: string;
  private password: string;

  constructor(body: UserAttrs) {
    this.email = body.email;
    this.password = body.password;
  }

  async signup() {
    await this.isEmailUnique();
    const createdUser = await this.createUser();
    return this.generateTokens(createdUser.id, createdUser.email);
  }

  private async isEmailUnique() {
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
  }

  private async createUser() {
    const user = User.build({ email: this.email, password: this.password });
    await user.save();
    return user;
  }

  private generateTokens(id: string, email: string) {
    const { accessToken, refreshToken } = getTokens({ id, email });
    return { email, id, accessToken, refreshToken };
  }
}
