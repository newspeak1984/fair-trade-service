import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  user_uuid: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field()
  is_onboarded: boolean;
}
