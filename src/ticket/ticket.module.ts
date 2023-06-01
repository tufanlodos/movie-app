import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MovieModule } from 'src/movie';
import { MongooseModule } from '@nestjs/mongoose';
import { TICKET_MODEL_NAME, TicketSchema } from './ticket.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TICKET_MODEL_NAME, schema: TicketSchema },
    ]),
    MovieModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
