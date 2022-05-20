import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  chat_uuid: string;

  @Field()
  sender_uuid: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  trade_uuid?: string;
}
