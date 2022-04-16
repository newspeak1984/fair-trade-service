import { UpdateItemInput } from './dto/update-item.input';
import { CreateItemInput } from './dto/create-item.input';
import { ItemDocument } from './items.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Item } from './models/item.model';
import { UpdateStatusInput } from './dto/update-status.input';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('items')
    private itemsModel: Model<ItemDocument>,
  ) {}

  async findOne(item_uuid: string): Promise<Item> {
    return await this.itemsModel.findOne({ item_uuid });
  }

  async findMany(item_uuids: string[]): Promise<Item[]> {
    return await this.itemsModel.find({ 
      item_uuid: {
        $in: item_uuids
      } 
    });
  }

  async findAll(user_uuid: string): Promise<Item[]> {
    return await this.itemsModel.find({ user_uuid });
  }

  async remove(item_uuid: string): Promise<boolean> {
    const res = await this.itemsModel.deleteOne({ item_uuid });
    return res.deletedCount == 1;
  }

  async removeMany(item_uuids: string[]): Promise<boolean> {
    const res = await this.itemsModel.deleteMany({
      item_uuid: {
        $in: item_uuids
      }
    });
    return res.deletedCount == item_uuids.length;
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = new this.itemsModel({
      ...createItemInput,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newItem.save();
  }

  async update(updateItemInput: UpdateItemInput): Promise<Item> {
    await this.itemsModel
      .updateOne(
        { item_uuid: updateItemInput.item_uuid },
        { $set: { ...updateItemInput, updated_at: new Date() } },
      )
      .exec();

      return await this.findOne(updateItemInput.item_uuid);
  }

  async updateStatuses(updateStatusInput: UpdateStatusInput): Promise<Item[]> {
    const res = await this.itemsModel
      .updateMany(
        { item_uuid: { $in: updateStatusInput.item_uuids } },
        { $set: { status: updateStatusInput.status, updated_at: new Date() } },
      )
      .exec();
    return await this.findMany(updateStatusInput.item_uuids);
  }

}