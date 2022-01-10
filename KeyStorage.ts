import { isUndefined } from "util";
import { LogStorage } from "./LogStorage";
import { IStorage } from "./IStorage";
import { HashTable } from "./HashTable";
import { DiskStorage } from "./DiskStorage";

export class KeyStorage implements IStorage {
  private memoryStorage: HashTable;
  private logStorage: LogStorage;
  private diskStorage: DiskStorage;

  constructor() {
    this.logStorage = new LogStorage("LogStorage.txt");
    this.memoryStorage = new HashTable(1000, this.logStorage);
    this.diskStorage = new DiskStorage("DiskStorage.txt");
  }

  public set(key: string, value: string): void {
    this.memoryStorage.set(key, value);
  }

  public get(key: string): string | undefined {
    return this.memoryStorage.get(key);
  }

  public delete(key: string): boolean {
    return this.memoryStorage.delete(key);
  }

  public isExist(key: string): boolean {
    const value = this.memoryStorage.get(key);
    return isUndefined(value) ? false : true;
  }

  // TODO By cron job or based on file size we launch process of saving new records on disk
  private saveOnDisk() {
    const mergedData = this.logStorage.getMergedKeys();
    this.diskStorage.save(mergedData);
  }
}
