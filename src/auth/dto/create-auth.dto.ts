import { IsString, IsDefined } from 'class-validator';

export class CreateAuthDto {
  @IsDefined()
  @IsString()
  password: string;
  @IsDefined()
  @IsString()
  login: string;
}
