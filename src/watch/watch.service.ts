import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { WatchDto } from './watch.dto';
import { TicketService } from 'src/ticket';
import { MovieService } from 'src/movie';
import { TokenPayload } from 'src/common';
import { InjectModel } from '@nestjs/mongoose';
import { WATCH_MODEL_NAME, Watch } from './watch.model';
import { Model } from 'mongoose';

@Injectable()
export class WatchService {
  constructor(
    @InjectModel(WATCH_MODEL_NAME)
    private readonly watch: Model<Watch>,
    private readonly ticketService: TicketService,
    private readonly movieService: MovieService,
  ) {}

  async getWatchHistory(userId: string) {
    try {
      const watchedMovies = await this.watch.find({ 'user.id': userId });
      return watchedMovies.map((watchedMovie) => ({
        date: watchedMovie.createdAt,
        movie: watchedMovie.movie,
      }));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async watchMovie(
    { movieId, sessionId }: WatchDto,
    tokenPayload: TokenPayload,
  ) {
    try {
      const ticket = await this.ticketService.validateTicket(
        tokenPayload.userId,
        movieId,
        sessionId,
      );
      if (!ticket) {
        throw new UnauthorizedException("You don't have a valid ticket.");
      }

      const watchRecord = await this.watch.create({
        user: {
          id: tokenPayload.userId,
          email: tokenPayload.email,
          age: tokenPayload.age,
        },
        movie: await this.movieService.getMovie(movieId),
        ticketId: ticket.id,
      });
      await watchRecord.save();

      return {
        user: watchRecord.user,
        movie: watchRecord.movie,
        ticketId: watchRecord.ticketId,
        date: watchRecord.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
