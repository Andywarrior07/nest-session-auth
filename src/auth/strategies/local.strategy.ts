import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AUTH_SERVICE } from 'src/common/constants';
import { IAuthService } from '../interfaces/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.signIn({ email, password });
  }
}
