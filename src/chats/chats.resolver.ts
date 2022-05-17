import { TradeChat } from './models/trade-chat.model';
import { CreateChatInput } from './dto/create-chat.input';
import { UpsertTradeChatInput } from './dto/upsert-trade-chat.input';
import { ChatsService } from './chats.service';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Chat } from './models/chat.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @Query(() => [Chat])
  getChats(@Args('chat_uuid') chat_uuid: string) {
    return this.chatsService.getChats(chat_uuid);
  }

  @Query(() => TradeChat)
  getTradeChat() {
    return {};
  }

  @Mutation(() => Chat)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    const newChat = this.chatsService.saveChat(createChatInput);
    pubSub.publish('newChat', { newChat: newChat });
    return newChat;
  }

  @Mutation(() => TradeChat)
  async upsertTradeChat(
    @Args('upsertTradeChatInput') upsertTradeChatInput: UpsertTradeChatInput,
  ) {
    const res = await this.chatsService.upsertTradeChat(upsertTradeChatInput);
    return res;
  }

  @Subscription(() => Chat)
  newChat() {
    return pubSub.asyncIterator('newChat');
  }
}
