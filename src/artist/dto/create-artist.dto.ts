import { IsDefined, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsBoolean()
  @IsDefined()
  grammy: boolean;
}
