export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findOne(options: any): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
