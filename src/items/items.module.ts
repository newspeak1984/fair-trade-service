import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { ItemSchema } from './items.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'items', schema: ItemSchema }]),
    UsersModule,
  ],
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsResolver],
})
export class ItemsModule {}
