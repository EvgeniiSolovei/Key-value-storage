export class DiskStorage {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public save(data: Array<{ key: number; value: string }>): void {
    // TODO Save on disk and replace old values
  }
}
