import { TradesService } from './trades.service';
import { TradesResolver } from './trades.resolver';
import { TradeSchema } from './trades.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'trades', schema: TradeSchema }]),
    ItemsModule,
    UsersModule,
    ChatsModule,
  ],
  providers: [TradesResolver, TradesService],
})
export class TradesModule {}
