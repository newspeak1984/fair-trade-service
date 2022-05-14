import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TradeDocument } from './trades.schema';
import { Model } from 'mongoose';
import { Trade } from './trades.schema';
import { CreateTradeInput } from './dto/create-trade.input';
import { UpdateStatesInput } from './dto/update-state.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TradesService {
  constructor(
    @InjectModel('trades')
    private tradesModel: Model<TradeDocument>,
  ) {}

  async findOne(trade_uuid: string): Promise<Trade> {
    return await this.tradesModel.findOne({ trade_uuid });
  }

  async findMany(trade_uuids: string[]): Promise<Trade[]> {
    return await this.tradesModel.find({
      trade_uuid: {
        $in: trade_uuids,
      },
    });
  }

  async findAll(user_uuid: string, state = 'all'): Promise<Trade[]> {
    const queryObj = {
      $or: [{ sender_uuid: user_uuid }, { receiver_uuid: user_uuid }],
    };

    if (state !== 'all') {
      queryObj['state'] = state;
    }

    return await this.tradesModel.find(queryObj);
  }

  async removeMany(trade_uuids: string[]): Promise<boolean> {
    const res = await this.tradesModel.deleteMany({
      trade_uuid: {
        $in: trade_uuids,
      },
    });
    return res.deletedCount == trade_uuids.length;
  }

  async create(createTradeInput: CreateTradeInput): Promise<Trade> {
    const newTrade = new this.tradesModel({
      ...createTradeInput,
      trade_uuid: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newTrade.save();
  }

  async updateStates(updateStatesInput: UpdateStatesInput): Promise<Trade[]> {
    await this.tradesModel
      .updateMany(
        { trade_uuid: { $in: updateStatesInput.trade_uuids } },
        { $set: { state: updateStatesInput.state, updated_at: new Date() } },
      )
      .exec();

    const res = await this.findMany(updateStatesInput.trade_uuids);

    if (updateStatesInput.state === 'Accepted') {
      let uuids = [];
      res.map((trade) => {
        uuids = [
          ...uuids,
          ...trade.receiver_item_uuids,
          ...trade.sender_item_uuids,
        ];
      });

      const uniqueUuids = [...new Set(uuids)];

      await this.tradesModel.updateMany(
        {
          state: 'Pending',
          $or: [
            { receiver_item_uuids: { $in: uniqueUuids } },
            { sender_item_uuids: { $in: uniqueUuids } },
          ],
        },
        { $set: { state: 'Archived', updated_at: new Date() } },
      );
    }
    return res;
  }
}
