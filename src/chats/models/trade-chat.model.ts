import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from './chat.model';
@ObjectType()
export class TradeChat {
  @Field()
  chat_uuid: string;

  @Field()
  trade_uuid: string;

  // @Field(() => [Chat])
  // chats: Chat[];
}
