import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
  sender_items: string[];

  @Prop({ type: [String] })
  receiver_items: string[];

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ type: [String] })
  trade_history: string[];
}

export const TradeSchema = SchemaFactory.createForClass(Trade);