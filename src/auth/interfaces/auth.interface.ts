import { User } from 'src/users/schemas/user.schema';

export interface IAuthService {
  signUp(createUserDto: CreateUserDto): Promise<User>;
  signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse>;
}
