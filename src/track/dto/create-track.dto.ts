import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty()
  duration: number;
}
