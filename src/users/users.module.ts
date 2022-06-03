import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_SERVICE } from 'src/common/constants';
import { UsersService } from './providers/users.service';
import { UsersRepository } from './repositories/users.repository';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersRepository,
    { provide: USERS_SERVICE, useClass: UsersService },
  ],
})
export class UsersModule {}
