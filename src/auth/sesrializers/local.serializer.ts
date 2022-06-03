import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { USERS_SERVICE } from 'src/common/constants';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getUserById(userId);
    done(null, user);
  }
}
