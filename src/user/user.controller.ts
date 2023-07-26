import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DBservice } from 'src/dataBase/db.service';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  // @Get()
  // getAllUsers() {
  //   return this.service.addUser();
  // }
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.service.addUser(dto);
  }
  // @Put(':id')
  // updateUser(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
  //   return this.service.updateUser(id, dto);
  // }
}
