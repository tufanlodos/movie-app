import { IsNotEmpty, IsString } from 'class-validator';

export class BuyTicketDto {
  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;
}
