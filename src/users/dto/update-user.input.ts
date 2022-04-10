import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  user_uuid: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  is_onboarded?: boolean;
}
