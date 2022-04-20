import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  item_uuid: string;

  @Prop()
  user_uuid: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop()
  status: string;

  @Prop()
  looking_for: string;

  @Prop()
  image_url: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
