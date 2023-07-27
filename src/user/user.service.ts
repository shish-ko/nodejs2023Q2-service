import { Injectable, HttpException, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER, User } from './entities/User';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { getUniqueItem } from 'src/utils';

Injectable();
export class UserService {
  constructor(@Inject(DBservice) private db: DBservice) {}
  addUser(dto: CreateUserDto) {
    const user = this.db.users.create(new User(dto));
    delete user.password;
    return user;
  }
  updateUser(id: string, dto: UpdatePasswordDto) {
    const currentUser = getUniqueItem(id, this.db.users);
    if (currentUser.password === dto.oldPassword) {
      const user = this.db.users.update(id, [
        [USER.PASSWORD, dto.newPassword],
        [USER.VERSION, currentUser.version + 1],
        [USER.UPDATEDAT, Date.now()],
      ]);
      delete user.password;
      return user;
    } else {
      throw new HttpException('Invalid password', 403);
    }
  }
  getAllUsers() {
    const users = this.db.users.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
  getUser(id: string) {
    return getUniqueItem(id, this.db.users);
  }
  deleteUser(id: string) {
    getUniqueItem(id, this.db.users);
    return this.db.users.delete(id);
  }
}
