import { Injectable } from '@nestjs/common';
import { IUsersService } from '../interfaces/users.interface';

@Injectable()
export class UsersService implements IUsersService {
  getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
}
