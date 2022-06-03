export interface IBaseRepository<E, D> {
  findAll(): Promise<D[]>;
  findById(id: string): Promise<D>;
  findOne(options: any): Promise<D>;
  create(data: Partial<D>): Promise<D>;
  update(id: string, data: Partial<D>): Promise<D>;
  delete(id: string): Promise<void>;
}
