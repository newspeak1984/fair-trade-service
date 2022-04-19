import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput {
  @Field()
  item_uuid: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  looking_for?: string;
}