import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TradeDocument = Trade & Document;

@Schema()
export class Trade {
  @Prop()
  trade_uuid: string;

  @Prop()
  sender_uuid: string;

  @Prop()
  receiver_uuid: string;

  @Prop()
  state: string;

  @Prop({ type: [String] })
  sender_item_uuids: string[];

  @Prop({ type: [String] })
  receiver_item_uuids: string[];

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop()
  previous_trade_uuid: string;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
