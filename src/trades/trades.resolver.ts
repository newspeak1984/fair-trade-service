import { CreateTradeInput } from './dto/create-trade.input';
import { Trade } from './models/trade.model';
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { TradesService } from "./trades.service";
import { UpdateStatesInput } from './dto/update-state.input';

@Resolver()
export class TradesResolver {
  constructor(private tradeService: TradesService) { }

  @Query(() => Trade)
  getTrade(@Args('trade_uuid') trade_uuid:string) {
    return this.tradeService.findOne(trade_uuid);
  }

  @Query(() => [Trade])
  getTrades(@Args({ name: 'trade_uuids', type: () => [String] }) trade_uuids: string[]) {
    return this.tradeService.findMany(trade_uuids);
  }

  @Query(() => [Trade])
  getUserTrades(@Args('user_uuid') user_uuid: string) {
    return this.tradeService.findAll(user_uuid);
  }

  @Mutation(() => Boolean)
  removeTrades(@Args({ name: 'trade_uuids', type: () => [String] }) trade_uuids: string[]) {
    return this.tradeService.removeMany(trade_uuids);
  }

  @Mutation(() => Trade)
  createTrade(@Args('createTradeInput') createTradeInput: CreateTradeInput) {
    return this.tradeService.create(createTradeInput);
  }

  @Mutation(() => [Trade])
  updateTradeStates(@Args('updateStatesInput') updateStatesInput: UpdateStatesInput) {
    return this.tradeService.updateStates(updateStatesInput);
  }
}