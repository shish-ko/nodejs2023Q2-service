import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DBservice } from 'src/dataBase/db.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DBservice) private db: DBservice,
    @Inject(UserService) private userService: UserService,
  ) {}

  signup(dto: CreateAuthDto) {
    return this.userService.addUser(dto);
  }

  async login({ login: dtoLogin, password: dtoPassword }: CreateAuthDto) {
    try {
      const { id, password, login } = await this.db.user.findUnique({
        where: { login: dtoLogin },
      });
      const isValidPassword = await bcrypt.compare(dtoPassword, password);
      if (!isValidPassword) throw new Error();
      return this.getTokens(id, login);
    } catch {
      throw new HttpException('Authentication error', 403);
    }
  }

  refresh(dto: UpdateAuthDto) {
    try {
      const payload = jwt.verify(
        dto.refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      );
      if (
        typeof payload === 'object' &&
        'userId' in payload &&
        'login' in payload
      ) {
        return this.getTokens(payload.userId, payload.login);
      } else {
        throw new Error();
      }
    } catch {}
  }
  getTokens(id: string, login: string) {
    const accessToken = jwt.sign(
      { userId: id, login: login },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    );
    const refreshToken = jwt.sign(
      { userId: id, login: login },
      process.env.JWT_SECRET_REFRESH_KEY,
      { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME },
    );
    return { accessToken, refreshToken };
  }
}
