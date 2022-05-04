import { Field, ObjectType } from '@nestjs/graphql';
import { Item } from './item.model';

@ObjectType()
export class ItemPagination {
  @Field(() => [Item])
  items: Item[];

  @Field({ nullable: true })
  cursor?: string;
}
