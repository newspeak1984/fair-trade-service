import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  user_uuid: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  looking_for?: string;

  @Field()
  image_url: string;
}
