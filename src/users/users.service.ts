import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private usersModel: Model<UsersDocument>,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.usersModel.findOne({ email });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = new this.usersModel({
      ...createUserInput,
      user_uuid: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      is_onboarded: false,
    });

    return newUser.save();
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    await this.usersModel
      .updateOne(
        { user_uuid: updateUserInput.user_uuid },
        { $set: { ...updateUserInput, updated_at: new Date() } },
      )
      .exec();

    return await this.findOne(updateUserInput.user_uuid);
  }
}
