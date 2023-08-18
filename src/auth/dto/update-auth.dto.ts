import { IsDefined, IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  @IsDefined()
  refreshToken: string;
}
