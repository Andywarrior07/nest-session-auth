import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from 'src/common/constants';
import { User } from 'src/users/schemas/user.schema';
import { CookieAuthGuard } from '../guards/cookieAuth.guard';
import { LogInWithCredentialsGuard } from '../guards/logInWithCredentialsGuard';
import { IAuthService } from '../interfaces/auth.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: any): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(200)
  @Post('/signin')
  @UseGuards(LogInWithCredentialsGuard)
  signIn(@Req() req: any) {
    return req.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Post('logout')
  async logOut(@Req() request: any) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @Get('/test')
  @UseGuards(CookieAuthGuard)
  testGet(@Req() req: any) {
    return req.user;
  }
}
