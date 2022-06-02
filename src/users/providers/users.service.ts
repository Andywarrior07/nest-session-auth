import { Injectable } from '@nestjs/common';
import { IUsersService } from '../interfaces/users.interface';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly repository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    return await this.repository.findById(id);
  }
}
