import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DBservice } from 'src/dataBase/db.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DBservice) private db: DBservice,
    @Inject(UserService) private userService: UserService,
  ) {}

  signup(dto: CreateAuthDto) {
    return this.userService.addUser(dto);
  }

  async login({ login, password }: CreateAuthDto) {
    try {
      const user = await this.db.user.findUnique({ where: { login } });
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error();
      const accessToken = jwt.sign(
        { userId: user.id, login: user.login },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRE_TIME },
      );
      return { accessToken };
    } catch {
      throw new HttpException('Authentication error', 403);
    }
  }
}
