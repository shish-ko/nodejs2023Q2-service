import { DBStorage } from 'src/dataBase/dbStorage';
import { validate } from 'uuid';
import { HttpException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const getUniqueItem = (
  id: string,
  db: PrismaClient,
  table: Prisma.ModelName,
) => {
  if (!validate(id)) throw new HttpException('invalid id', 400);
  const item = db[`${table.toLowerCase()}`].findUnique({ where: { id } });
  if (!item) {
    throw new HttpException('item not found', 404);
  }
  return item;
};

export { getUniqueItem };
