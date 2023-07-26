import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DBservice } from 'src/dataBase/db.service';

@Controller('users')
export class UserController {
  constructor(private readonly db: DBservice) {}
  @Get()
  getAllUsers() {
    return this.db.users;
  }
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.db.addUser(dto);
  }
}
