import { ChatsService } from './chats.service';
import { ChatSchema, TradeChatSchema } from './chats.schema';
import { ChatsResolver } from './chats.resolver';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'chats', schema: ChatSchema }]),
    MongooseModule.forFeature([
      { name: 'tradeChats', schema: TradeChatSchema },
    ]),
  ],
  providers: [ChatsResolver, ChatsService],
  exports: [ChatsResolver],
})
export class ChatsModule {}
