import { Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
}
