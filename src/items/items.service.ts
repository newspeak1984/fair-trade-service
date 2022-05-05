import { ItemPaginationInput } from './dto/item-pagination.input';
import { UpdateItemInput } from './dto/update-item.input';
import { CreateItemInput } from './dto/create-item.input';
import { ItemDocument } from './items.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './items.schema';
import { UpdateStatusInput } from './dto/update-status.input';
import { v4 as uuidv4 } from 'uuid';
import { ItemPagination } from './models/item-pagination.model';

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
        $in: item_uuids,
      },
    });
  }

  async findAll(user_uuid: string): Promise<Item[]> {
    return await this.itemsModel.find({ user_uuid });
  }

  async findInOrder(
    itemPaginationInput: ItemPaginationInput,
  ): Promise<ItemPagination> {
    const decode = (str: string): string =>
      Buffer.from(str, 'base64').toString('binary');
    const encode = (str: string): string =>
      Buffer.from(str, 'binary').toString('base64');

    const quantity = itemPaginationInput.quantity;
    let items = [],
      lastElementAttribute = '';

    let findOptions = {};
    for (const filter in itemPaginationInput.filters) {
      if (itemPaginationInput.filters[filter].length) {
        findOptions = {
          ...findOptions,
          [filter]: { $in: itemPaginationInput.filters[filter] },
        };
      }
    }

    if (itemPaginationInput.search) {
      findOptions = {
        ...findOptions,
        $text: { $search: itemPaginationInput.search },
      };
    }

    if (itemPaginationInput.cursor) {
      findOptions = {
        ...findOptions,
        [itemPaginationInput.cursor_type]: {
          $lt: decode(itemPaginationInput.cursor),
        },
      };
    }

    items = await this.itemsModel
      .find(findOptions)
      .sort({ [itemPaginationInput.cursor_type]: -1 })
      .limit(quantity + 1);

    if (items.length === quantity + 1) {
      lastElementAttribute = items[items.length - 2]
        .toJSON()
        [itemPaginationInput.cursor_type].toString();
      items.pop();
    }

    return { items: items, cursor: encode(lastElementAttribute) };
  }

  async remove(item_uuid: string): Promise<boolean> {
    const res = await this.itemsModel.deleteOne({ item_uuid });
    return res.deletedCount == 1;
  }

  async removeMany(item_uuids: string[]): Promise<boolean> {
    const res = await this.itemsModel.deleteMany({
      item_uuid: {
        $in: item_uuids,
      },
    });
    return res.deletedCount == item_uuids.length;
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = new this.itemsModel({
      ...createItemInput,
      item_uuid: uuidv4(),
      status: 'listed',
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
