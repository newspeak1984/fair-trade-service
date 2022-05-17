import { ChatDocument, TradeChatDocument } from './chats.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './models/chat.model';
import { CreateChatInput } from './dto/create-chat.input';
import { TradeChat } from './models/trade-chat.model';
import { UpsertTradeChatInput } from './dto/upsert-trade-chat.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('chats')
    private chatsModel: Model<ChatDocument>,
    @InjectModel('tradeChats')
    private tradeChatModel: Model<TradeChatDocument>,
  ) {}

  async getChats(chat_uuid: string): Promise<Chat[]> {
    return await this.chatsModel.find({ chat_uuid }).sort({ timestamp: -1 });
  }

  async saveChat(createChatInput: CreateChatInput): Promise<Chat> {
    const newChat = new this.chatsModel({
      ...createChatInput,
      timestamp: new Date(),
    });

    return newChat.save();
  }

  async upsertTradeChat(
    upsertTradeChatInput: UpsertTradeChatInput,
  ): Promise<TradeChat> {
    const chat_uuid = upsertTradeChatInput.chat_uuid || uuidv4();
    const res = await this.tradeChatModel.findOneAndUpdate(
      { chat_uuid },
      { trade_uuid: upsertTradeChatInput.trade_uuid },
      {
        new: true,
        upsert: true,
      },
    );
    return res;
  }
}
