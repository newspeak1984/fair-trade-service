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
  sender_item_uuids: string[];

  @Field(() => [String])
  receiver_item_uuids: string[];

  @Field({ nullable: true })
  previous_trade_uuid?: string;
}
