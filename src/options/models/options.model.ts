import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Options {
  @Field()
  name: string;

  @Field(() => [String])
  options: string[];
}
