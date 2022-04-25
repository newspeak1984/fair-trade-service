import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTradeInput {
  @Field()
  sender_uuid: string;

  @Field()
  receiver_uuid: string;

  @Field()
  state: string;

  @Field(() => [String])
  sender_items: string[];

  @Field(() => [String])
  receiver_items: string[];

  @Field()
  trade_history: string;
}