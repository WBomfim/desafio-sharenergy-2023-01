export type tokenReturn = { token: string };

export interface ILoginService<T> {
  login(obj: unknown): Promise<tokenReturn | null>;
}

export interface IClientService<T> {
  create(obj: unknown): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, obj: T): Promise<T | null>;
  delete(_id: string): Promise<true | null>;
}
