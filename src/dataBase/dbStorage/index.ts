type merge<T> = { id: string } & T;
export class DBStorage<T> extends Array<merge<T>> {
  constructor() {
    super();
  }
  findMany(id?: string) {
    if (id) {
      const res = [];
      for (const item of this) {
        if (item.id === id) res.push(item);
      }
      return res;
    } else {
      return this;
    }
  }
  findUnique(id: string) {
    return this.find((item) => item.id === id);
  }
  create(model: merge<T>) {
    this.push(model);
    return model;
  }
}
