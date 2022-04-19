import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Item {
  @Field()
  item_uuid: string;

  @Field()
  user_uuid: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => Date)
  created_at?: Date;

  @Field(() => Date)
  updated_at?: Date;

  @Field()
  status: string;

  @Field({ nullable: true })
  looking_for?: string;
}