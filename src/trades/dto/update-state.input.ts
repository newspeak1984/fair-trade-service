import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStatesInput {
  @Field(() => [String])
  trade_uuids: string[];

  @Field()
  state: string;
}