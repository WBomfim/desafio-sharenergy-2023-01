export interface IUserModel<T> {
  readOne(_id: string): Promise<T | null>;
}

export interface IClientModel<T> {
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, obj: T): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}
