import { Injectable, HttpException } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validate } from 'uuid';

Injectable();
export class UserService {
  constructor(private db: DBservice) {}
  addUser(dto: CreateUserDto) {
    const user = new User(dto);
    console.log(this.db);
    // return this.db.db.users.create(user);
  }
  updateUser(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) throw new HttpException('invalid id', 400);
    const user = this.db.d.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    user.updateUser(dto);
    return user;
  }
}
