import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsResolver } from './options.resolver';
import { OptionsSchema } from './options.schema';
import { OptionsService } from './options.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'options', schema: OptionsSchema }]),
  ],
  providers: [OptionsResolver, OptionsService],
})
export class OptionsModule {}
