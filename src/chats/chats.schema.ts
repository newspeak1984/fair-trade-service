import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  chat_uuid: string;

  @Prop()
  sender_uuid: string;

  @Prop()
  message: string;

  @Prop()
  trade_uuid: string;

  @Prop({ type: Date })
  timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

export type TradeChatDocument = TradeChat & Document;

@Schema()
export class TradeChat {
  @Prop()
  chat_uuid: string;

  @Prop()
  trade_uuid: string;
}

export const TradeChatSchema = SchemaFactory.createForClass(TradeChat);
