import { TradeChat } from './models/trade-chat.model';
import { CreateChatInput } from './dto/create-chat.input';
import { UpsertTradeChatInput } from './dto/upsert-trade-chat.input';
import { ChatsService } from './chats.service';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Chat } from './models/chat.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => TradeChat)
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @Query(() => [Chat])
  getChats(@Args('chat_uuid') chat_uuid: string) {
    return this.chatsService.getChats(chat_uuid);
  }

  @Query(() => TradeChat)
  getTradeChat(@Args('trade_uuid') trade_uuid: string) {
    return this.chatsService.getTradeChat(trade_uuid);
  }

  @Mutation(() => Chat)
  async createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    const newChat = await this.chatsService.saveChat(createChatInput);
    pubSub.publish('newChat', {
      newChat,
    });
    return newChat;
  }

  @Mutation(() => TradeChat)
  async upsertTradeChat(
    @Args('upsertTradeChatInput') upsertTradeChatInput: UpsertTradeChatInput,
  ) {
    const res = await this.chatsService.upsertTradeChat(upsertTradeChatInput);
    return res;
  }

  @ResolveField()
  chats(@Parent() tradeChat: TradeChat) {
    return this.getChats(tradeChat.chat_uuid);
  }

  @Subscription(() => Chat, {
    filter: (payload, variables) => {
      return (
        variables.chat_uuid && payload.newChat.chat_uuid === variables.chat_uuid
      );
    },
  })
  newChat(@Args('chat_uuid') chat_uuid: string) {
    return pubSub.asyncIterator('newChat');
  }
}
