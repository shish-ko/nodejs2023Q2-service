type merge<T> = { id: string } & T;
export class DBStorage<T> extends Array<merge<T>> {
  constructor() {
    super();
  }
  findMany(id?: string) {
    if (id) {
      const res = [];
      for (const item of this) {
        if (item.id === id) res.push({ ...item });
      }
      return res;
    } else {
      return [...this];
    }
  }
  findUnique(id: string) {
    const item = this.find((item) => item.id === id);
    if (!item) return;
    return { ...item };
  }
  create(model: merge<T>) {
    this.push(model);
    return { ...model };
  }
  update(id: string, updates: [string, any][]) {
    const item = this.find((item) => item.id === id);
    for (const [key, value] of updates) {
      if (key in item) {
        item[key] = value;
      }
    }
    return { ...item };
  }
  delete(id: string) {
    const itemNum = this.findIndex((item) => item.id === id);
    this.splice(itemNum, 1);
    return true;
  }
}
