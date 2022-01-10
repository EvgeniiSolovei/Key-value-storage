import { LogStorage } from "./LogStorage";

export class HashTable {
  private table: Array<Record<string, string>>;
  private size: number;
  private logStorage: LogStorage;

  constructor(tableSize: number, logStorage: LogStorage) {
    this.table = new Array(tableSize);
    this.size = 0;
    this.logStorage = logStorage;
  }

  public set(key: string, value: string): void {
    const index = this.hash(key);
    if (this.table[index]) {
      this.table[index][key] = value;
    } else {
      this.table[index] = {
        [key]: value
      };
    }
    this.size++;
    this.logStorage.addRecord(index, JSON.stringify(this.table[index]));
  }

  public get(key: string): string | undefined {
    const index = this.hash(key);
    if (this.table[index]) {
      return this.table[index][key];
    }

    return undefined;
  }

  public delete(key: string): boolean {
    const index = this.hash(key);

    if (this.table[index] && this.table[index][key]) {
      delete this.table[index][key];

      if (Object.keys(this.table[index]).length === 0) {
        delete this.table[index];
        this.logStorage.deleteKey(index);
      }

      this.size--;
      return true;
    }
    return false;
  }

  private hash(key: string) {
    var hash = 0;
    if (key.length == 0) return hash;
    for (var i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash;
      hash += key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.table.length;
  }
}
