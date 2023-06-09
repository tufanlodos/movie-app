import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { MovieModule } from './movie';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { TicketModule } from './ticket/ticket.module';
import { WatchModule } from './watch/watch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        MONGO_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    MovieModule,
    CoreModule,
    CommonModule,
    TicketModule,
    WatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
