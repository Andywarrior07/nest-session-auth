import { Controller, Get, Inject, Param } from '@nestjs/common';
import { USERS_SERVICE } from 'src/common/constants';
import { UsersService } from '../providers/users.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(@Inject(USERS_SERVICE) private readonly service: UsersService) {}

  @Get('/')
  getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<Partial<User>> {
    return this.service.getUserById(id);
  }
}
