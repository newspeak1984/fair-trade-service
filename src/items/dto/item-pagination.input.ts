import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FiltersInput {
  @Field(() => [String])
  category?: string[];
}

@InputType()
export class ItemPaginationInput {
  @Field()
  quantity: number;

  @Field()
  cursor_type: string;

  @Field({ nullable: true })
  cursor?: string;

  @Field({ nullable: true })
  search?: string;

  @Field(() => FiltersInput, { nullable: true, defaultValue: {} })
  filters?: FiltersInput;
}
