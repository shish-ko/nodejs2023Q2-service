import { IsNumber, IsDefined } from 'class-validator';

export class UpdateTrackDto {
  @IsDefined()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNumber()
  duration: number;
}
