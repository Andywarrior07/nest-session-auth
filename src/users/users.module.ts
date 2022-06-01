import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './providers/users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: 'IUsersService', useClass: UsersService }],
})
export class UsersModule {}
