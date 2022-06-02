import { User } from '../schemas/user.schema';

export interface IUsersService {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
}
