import { ItemPaginationInput } from './dto/item-pagination.input';
import { ItemPagination } from './models/item-pagination.model';
import { UpdateStatusInput } from './dto/update-status.input';
import { UpdateItemInput } from './dto/update-item.input';
import { CreateItemInput } from './dto/create-item.input';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ItemsService } from "./items.service";
import { Item } from "./models/item.model";

@Resolver()
export class ItemsResolver {
  constructor(private itemService: ItemsService) { }

  @Query(() => Item)
  getItem(@Args('item_uuid') item_uuid: string) {
    return this.itemService.findOne(item_uuid);
  }

  @Query(() => [Item])
  getItems(@Args({ name: 'item_uuids', type: () => [String] }) item_uuids: string[]) {
    return this.itemService.findMany(item_uuids);
  }

  @Query(() => [Item])
  getUserItems(@Args('user_uuid') user_uuid: string) {
    return this.itemService.findAll(user_uuid);
  }

  @Query(() => ItemPagination)
  getItemPagination(@Args('itemPaginationInput') itemPaginationInput: ItemPaginationInput) {
     return this.itemService.findInOrder(itemPaginationInput);
  }

  @Mutation(() => Boolean)
  removeItem(@Args('item_uuid') item_uuid: string) {
    return this.itemService.remove(item_uuid);
  }

  @Mutation(() => Boolean)
  removeItems(@Args({ name: 'item_uuids', type: () => [String] }) item_uuids: string[]) {
    return this.itemService.removeMany(item_uuids);
  }

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemService.create(createItemInput);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemService.update(updateItemInput);
  }

  @Mutation(() => [Item])
  updateItemStatuses(@Args('updateStatusInput') updateStatusInput: UpdateStatusInput) {
    return this.itemService.updateStatuses(updateStatusInput);
  }
}