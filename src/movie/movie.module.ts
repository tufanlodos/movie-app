import { Module } from '@nestjs/common';
import { MovieService as MovieService } from './movie.service';
import { MovieController as MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MOVIE_MODEL_NAME, MovieSchema } from './movie.model';
import { SESSION_MODEL_NAME, SessionSchema } from './session.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MOVIE_MODEL_NAME, schema: MovieSchema },
      { name: SESSION_MODEL_NAME, schema: SessionSchema },
    ]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
