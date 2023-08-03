import { Injectable, HttpException, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER, User } from './entities/User';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { TransformedUser } from './entities/TransformedUser';

Injectable();
export class UserService {
  constructor(@Inject(DBservice) private db: DBservice) {}
  async addUser(dto: CreateUserDto) {
    const user = await this.db.user.create({ data: dto });
    return new TransformedUser(user);
  }
  async updateUser(id: string, dto: UpdatePasswordDto) {
    const currentUser = await this.db.user.findUniqueOrThrow({ where: { id } });
    if (currentUser.password === dto.oldPassword) {
      const user = await this.db.user.update({
        where: { id },
        data: { password: dto.newPassword, version: currentUser.version + 1 },
      });
      return new TransformedUser(user);
    } else {
      throw new HttpException('Invalid password', 403);
    }
  }
  async getAllUsers() {
    const users = await this.db.user.findMany();
    return users.map((user) => {
      return new TransformedUser(user);
    });
  }
  async getUser(id: string) {
    const user = await this.db.user.findUniqueOrThrow({ where: { id } });
    return new TransformedUser(user);
  }
  async deleteUser(id: string) {
    return await this.db.user.delete({ where: { id } });
  }
}
