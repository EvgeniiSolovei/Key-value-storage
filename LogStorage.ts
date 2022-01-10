import * as fs from "fs";

export class LogStorage {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public addRecord(index: number, value: string): void {
    try {
      fs.appendFileSync(this.path, `\n${index}:${value}`, "utf8");
      console.log('The "data to append" was appended to file!');
    } catch (err) {
      /* Handle the error */
    }
  }

  public deleteKey(index: number) {
    fs.appendFileSync(this.path, `\n${index}:deleted`, "utf8");
  }

  public getMergedKeys(): Array<{ key: number; value: string }> {
    // TODO We merge the records and leave only the actual ones
    return [];
  }
}
