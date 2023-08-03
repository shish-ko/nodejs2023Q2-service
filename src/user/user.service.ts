import { Injectable, HttpException, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER, User } from './entities/User';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { getUniqueItem } from 'src/utils';
import { Prisma } from '@prisma/client';

Injectable();
export class UserService {
  constructor(@Inject(DBservice) private db: DBservice) {}
  async addUser(dto: CreateUserDto) {
    const user = await this.db.user.create({ data: dto });
    return user;
  }
  // updateUser(id: string, dto: UpdatePasswordDto) {
  //   const currentUser = getUniqueItem(id, this.db, Prisma.ModelName.User);
  //   if (currentUser.password === dto.oldPassword) {
  //     const user = this.db.user.update({where: {id}, data: {password: dto.newPassword, version: currentUser.}});
  //     delete user.password;
  //     return user;
  //   } else {
  //     throw new HttpException('Invalid password', 403);
  //   }
  // }
  async getAllUsers() {
    const users = await this.db.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
  async getUser(id: string) {
    return await this.db.user.findUniqueOrThrow({ where: { id } });
  }
  async deleteUser(id: string) {
    return await this.db.user.delete({ where: { id } });
  }
}
