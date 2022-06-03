import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTH_SERVICE, USERS_SERVICE } from 'src/common/constants';
import { UsersService } from 'src/users/providers/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { LocalSerializer } from './sesrializers/local.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersRepository,
    LocalStrategy,
    LocalSerializer,
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: USERS_SERVICE, useClass: UsersService },
  ],
})
export class AuthModule {}
