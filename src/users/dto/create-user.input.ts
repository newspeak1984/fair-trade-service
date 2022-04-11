import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  user_uuid: string;

  @Field()
  email: string;
}
