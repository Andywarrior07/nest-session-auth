import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthInterface') private readonly authService: AuthInterface,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}
