import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class Trade {
  @Field()
  trade_uuid: string;

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

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field()
  trade_history: string;
}