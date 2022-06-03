import { Model } from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository.interface';

export class BaseRepository<E, D> implements IBaseRepository<E, D> {
  constructor(protected modelSchema: Model<E>) {}

  async findAll(): Promise<D[]> {
    return await this.modelSchema.find().lean();
  }

  async findById(id: string): Promise<D> {
    return await this.modelSchema.findById(id).lean();
  }

  async findOne(options: any): Promise<D> {
    return await this.modelSchema.findOne(options).lean();
  }

  async create(data: Partial<D>): Promise<D> {
    const model = new this.modelSchema(data);

    return (await model.save()).toObject();
  }

  async update(id: string, data: Partial<D>): Promise<D> {
    return await this.modelSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    return await this.modelSchema.findOneAndDelete({ _id: id });
  }
}
