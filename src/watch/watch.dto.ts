import { IsNotEmpty, IsString } from 'class-validator';

export class WatchDto {
  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;
}
