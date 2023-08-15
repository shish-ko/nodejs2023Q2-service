import { Injectable, HttpException, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { TransformedUser } from './entities/TransformedUser';
import * as bcrypt from 'bcryptjs';
import { getHashedPassword } from 'src/utils';

Injectable();
export class UserService {
  constructor(@Inject(DBservice) private db: DBservice) {}
  async addUser(dto: CreateUserDto) {
    const hashedPassword = await getHashedPassword(dto.password);
    const user = await this.db.user.create({
      data: { login: dto.login, password: hashedPassword },
    });
    return new TransformedUser(user);
  }
  async updateUser(id: string, dto: UpdatePasswordDto) {
    const currentUser = await this.db.user.findUniqueOrThrow({ where: { id } });
    if (await bcrypt.compare(dto.oldPassword, currentUser.password)) {
      const hashedPassword = await getHashedPassword(dto.newPassword);
      const user = await this.db.user.update({
        where: { id },
        data: { password: hashedPassword, version: currentUser.version + 1 },
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
