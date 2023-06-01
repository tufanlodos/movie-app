import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MovieService } from 'src/movie';
import { BuyTicketDto } from './ticket.dto';
import { TICKET_MODEL_NAME, Ticket } from './ticket.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenPayload } from 'src/common';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(TICKET_MODEL_NAME)
    private readonly ticket: Model<Ticket>,
    private readonly movieService: MovieService,
  ) {}

  private async normalizeTicket(ticket: Ticket) {
    return {
      id: ticket.id,
      userId: ticket.userId,
      movieId: ticket.movieId,
      sessionId: ticket.sessionId,
    };
  }

  async findTicket(id: string) {
    try {
      const ticket = await this.ticket.findById(id);
      return this.normalizeTicket(ticket);
    } catch (error) {
      throw new BadRequestException('Could not find ticket.');
    }
  }

  async validateTicket(userId: string, movieId: string, sessionId: string) {
    try {
      const ticket = await this.ticket.findOne({
        userId,
        movieId,
        sessionId,
      });
      if (!ticket) return undefined;
      return ticket;
    } catch (error) {
      throw new BadRequestException('Could not validate ticket.');
    }
  }

  async buyTicket(
    { movieId, sessionId }: BuyTicketDto,
    tokenPayload: TokenPayload,
  ) {
    try {
      const movie = await this.movieService.getMovie(movieId);
      const sessionExists = movie.sessions.some(
        (session) => session.id === sessionId,
      );
      if (!sessionExists) {
        throw new BadRequestException('Session not found');
      }

      if (movie.minAge > tokenPayload.age) {
        throw new UnauthorizedException(
          'You are not allowed to watch this movie',
        );
      }
      const newTicket = await this.ticket.create({
        userId: tokenPayload.userId,
        movieId,
        sessionId,
      });
      await newTicket.save();
      return this.normalizeTicket(newTicket);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
