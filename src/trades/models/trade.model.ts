import { Field, ObjectType } from '@nestjs/graphql';
import { Item } from '../../items/models/item.model';
import { User } from '../../users/models/users.model';
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
  sender_item_uuids: string[];

  @Field(() => [String])
  receiver_item_uuids: string[];

  @Field(() => [Item])
  sender_items: Item[];

  @Field(() => [Item])
  receiver_items: Item[];

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field({ nullable: true })
  previous_trade_uuid?: string;

  @Field(() => Trade, { nullable: true })
  previous_trade?: Trade;
}
