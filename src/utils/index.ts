import { DBStorage } from 'src/dataBase/dbStorage';
import { validate } from 'uuid';
import { HttpException } from '@nestjs/common';

const getUniqueItem = <T>(id: string, db: DBStorage<T>) => {
  if (!validate(id)) throw new HttpException('invalid id', 400);
  const item = db.findUnique(id);
  if (!item) {
    throw new HttpException('item not found', 404);
  }
  return item;
};

export { getUniqueItem };
