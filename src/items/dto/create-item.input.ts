import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
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

  @Field()
  status: string;

  @Field({ nullable: true })
  looking_for?: string;
}