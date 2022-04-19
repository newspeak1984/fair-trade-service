import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { ItemSchema } from './items.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'items', schema: ItemSchema}])
  ],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
