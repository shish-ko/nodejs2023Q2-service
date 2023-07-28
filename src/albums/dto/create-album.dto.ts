import { IsDefined, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsNumber()
  @IsDefined()
  year: number;
  artistId: string | null;
}
