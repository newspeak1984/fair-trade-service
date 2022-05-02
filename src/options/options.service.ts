import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsDocument } from './options.schema';
import { Options } from './models/options.model';
import { Model } from 'mongoose';

@Injectable()
export class OptionsService {
  constructor(
    @InjectModel('options')
    private optionsModel: Model<OptionsDocument>,
  ) {}

  async findOne(name: string): Promise<Options> {
    return await this.optionsModel.findOne({ name });
  }
}
