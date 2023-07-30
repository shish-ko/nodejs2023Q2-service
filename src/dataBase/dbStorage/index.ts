type merge<T> = { id: string } & T & Partial<{ deleteReferences: () => void }>;
export class DBStorage<T> extends Array<merge<T>> {
  constructor() {
    super();
  }
  findMany(idArr?: string[]) {
    if (idArr) {
      const res = [];
      for (const item of this) {
        if (idArr.includes(item.id)) res.push({ ...item });
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
    let itemInd: number;
    const item = this.find((i, ind) => {
      if (i.id === id) {
        itemInd = ind;
        return true;
      }
    });
    if (
      'deleteReferences' in item &&
      typeof item.deleteReferences === 'function'
    ) {
      item.deleteReferences();
    }
    this.splice(itemInd, 1);
    return true;
  }
}
