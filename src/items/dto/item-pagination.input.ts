import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemPaginationInput {
  @Field()
  quantity: number;

  @Field()
  cursor_type: string;
  
  @Field({ nullable: true })
  cursor?: string;
}