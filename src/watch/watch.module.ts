import { Module } from '@nestjs/common';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { TicketModule } from 'src/ticket';
import { MongooseModule } from '@nestjs/mongoose';
import { WATCH_MODEL_NAME, WatchSchema } from './watch.model';
import { MovieModule } from 'src/movie';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WATCH_MODEL_NAME, schema: WatchSchema },
    ]),
    MovieModule,
    TicketModule,
  ],
  controllers: [WatchController],
  providers: [WatchService],
})
export class WatchModule {}
