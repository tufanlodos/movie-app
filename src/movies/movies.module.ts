import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
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
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
