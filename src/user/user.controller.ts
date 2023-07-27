import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  getAllUsers() {
    return this.service.getAllUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.service.getUser(id);
  }
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.service.addUser(dto);
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.service.updateUser(id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
