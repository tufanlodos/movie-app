import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, TokenPayload, User } from 'src/common';
import { TicketService } from './ticket.service';
import { BuyTicketDto } from './ticket.dto';

@Controller('ticket')
@UseGuards(AuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('buy')
  async buyTicket(
    @Body() param: BuyTicketDto,
    @User() tokenPayload: TokenPayload | undefined,
  ) {
    if (!tokenPayload) {
      throw new InternalServerErrorException('tokenPayload not found');
    }
    return this.ticketService.buyTicket(param, tokenPayload);
  }
}
