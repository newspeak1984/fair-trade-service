import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OptionsDocument = Options & Document;

@Schema()
export class Options {
  @Prop()
  name: string;

  @Prop({ type: [String] })
  options: string[];
}

export const OptionsSchema = SchemaFactory.createForClass(Options);
