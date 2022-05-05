import { CreateTradeInput } from './dto/create-trade.input';
import { Trade } from './models/trade.model';
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TradesService } from './trades.service';
import { UpdateStatesInput } from './dto/update-state.input';
import { ItemsResolver } from '../items/items.resolver';
import { UsersResolver } from '../users/users.resolver';

@Resolver((of) => Trade)
export class TradesResolver {
  constructor(
    private tradeService: TradesService,
    private itemsResolver: ItemsResolver,
    private usersResolver: UsersResolver,
  ) {}

  @Query(() => Trade)
  getTrade(@Args('trade_uuid') trade_uuid: string) {
    return this.tradeService.findOne(trade_uuid);
  }

  @Query(() => [Trade])
  getTrades(
    @Args({ name: 'trade_uuids', type: () => [String] }) trade_uuids: string[],
  ) {
    return this.tradeService.findMany(trade_uuids);
  }

  @Query(() => [Trade])
  getUserTrades(@Args('user_uuid') user_uuid: string) {
    return this.tradeService.findAll(user_uuid);
  }

  @Mutation(() => Boolean)
  removeTrades(
    @Args({ name: 'trade_uuids', type: () => [String] }) trade_uuids: string[],
  ) {
    return this.tradeService.removeMany(trade_uuids);
  }

  @Mutation(() => Trade)
  createTrade(@Args('createTradeInput') createTradeInput: CreateTradeInput) {
    return this.tradeService.create(createTradeInput);
  }

  @Mutation(() => [Trade])
  updateTradeStates(
    @Args('updateStatesInput') updateStatesInput: UpdateStatesInput,
  ) {
    return this.tradeService.updateStates(updateStatesInput);
  }

  @ResolveField()
  sender_items(@Parent() trade: Trade) {
    return this.itemsResolver.getItems(trade.sender_item_uuids);
  }

  @ResolveField()
  receiver_items(@Parent() trade: Trade) {
    return this.itemsResolver.getItems(trade.receiver_item_uuids);
  }

  @ResolveField()
  sender(@Parent() trade: Trade) {
    return this.usersResolver.getUser(trade.sender_uuid);
  }

  @ResolveField()
  receiver(@Parent() trade: Trade) {
    return this.usersResolver.getUser(trade.receiver_uuid);
  }

  @ResolveField()
  previous_trade(@Parent() trade: Trade) {
    if (trade.previous_trade_uuid) {
      return this.getTrade(trade.previous_trade_uuid);
    }
    return null;
  }
}
