import { Document, Model } from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository.interface';

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(private readonly schemaModel: Model<T>) {}

  async findAll(): Promise<T[]> {
    return await this.schemaModel.find();
  }

  async findById(id: string): Promise<T> {
    return await this.schemaModel.findById(id);
  }

  async findOne(options: any): Promise<T> {
    return await this.schemaModel.findOne(options);
  }

  async create(data: Partial<T>): Promise<T> {
    const model = new this.schemaModel(data);
    return await model.save();
  }

  async update(_id: string, data: Partial<T>): Promise<T> {
    return await this.schemaModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.schemaModel.deleteOne({ _id: id });
  }
}
