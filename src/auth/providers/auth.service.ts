import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { User } from 'src/users/schemas/user.schema';
import { IAuthService } from '../interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userRepository: UsersRepository) {}
  async signUp(createUserDto: any) {
    const { password } = createUserDto;
    const salt = genSaltSync();
    const userData: Partial<User> = {
      ...createUserDto,
      salt,
      password: hashSync(password, salt),
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = await this.userRepository.create(userData);

      return user;
    } catch (err) {
      if (err && err.code === 11000) {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: any): Promise<any> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials 1');
    }

    const isValidPassword = this.validatePassword(
      user.password,
      password,
      user.salt,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Credentials 2');
    }

    const asd = JSON.parse(
      JSON.stringify({ _id: user._id, email: user.email }),
    );

    return {
      ...asd,
    };
  }

  private validatePassword(
    userPassword: string,
    password: string,
    salt: string,
  ): boolean {
    const hash = hashSync(password, salt);

    return hash === userPassword;
  }
}
