import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
