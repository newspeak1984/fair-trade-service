import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpsertTradeChatInput {
  @Field({ nullable: true })
  chat_uuid?: string;

  @Field({ nullable: true })
  trade_uuid?: string;
}
