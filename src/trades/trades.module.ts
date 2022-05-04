import { TradesService } from './trades.service';
import { TradesResolver } from './trades.resolver';
import { TradeSchema } from './trades.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'trades', schema: TradeSchema }]),
  ],
  providers: [TradesResolver, TradesService],
})
export class TradesModule {}
