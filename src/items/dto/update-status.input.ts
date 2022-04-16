import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStatusInput {
  @Field(() => [String])
  item_uuids: string[];

  @Field()
  status: string;
}