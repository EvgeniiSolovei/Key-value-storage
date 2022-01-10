export interface IStorage {
  set(key: string, value: string): void;
  get(key: string): string | undefined;
  delete(key: string): boolean;
  isExist(key: string): boolean;
}
