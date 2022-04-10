import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
