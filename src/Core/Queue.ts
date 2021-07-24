export default class Queue<T> {
  private list: Array<T>;

  constructor(list?: Array<T>) {
    this.list = list || [];
  }

  public clear(): void {
    this.list = [];
  }

  public putOnTop(item: T): void {
    this.list = [item, ...this.list];
  }

  public putOnBottom(item: T): void {
    this.list.push(item);
  }

  public removeHead(): void {
    this.list.shift();
  }

  public removeFeet(): void {
    this.list.pop();
  }

  public getAll(): Array<T> {
    return this.list;
  }

  public get(): T {
    return this.list[0];
  }
}
