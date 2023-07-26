import { HttpException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-user.dto';

export class User {
  id: string;
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
  constructor(dto: CreateUserDto) {
    this.id = uuid();
    this.login = dto.login;
    this.password = dto.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  updateUser(dto: UpdatePasswordDto) {
    if (this.password === dto.oldPassword) {
      this.password = dto.newPassword;
      this.updatedAt = Date.now();
      this.version += 1;
      return this;
    } else {
      throw new HttpException('Invalid password', 403);
    }
  }
}
