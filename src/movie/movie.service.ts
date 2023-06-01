import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MOVIE_MODEL_NAME, Movie } from './movie.model';
import { Model } from 'mongoose';
import { AddMovieDto, DeleteMovieDto, UpdateMovieDto } from './movie.dto';
import { SESSION_MODEL_NAME, Session } from './session.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MOVIE_MODEL_NAME) private readonly movie: Model<Movie>,
    @InjectModel(SESSION_MODEL_NAME) private readonly session: Model<Session>,
  ) {}

  private normalizeMovie(movie: Movie) {
    return {
      id: movie.id,
      name: movie.name,
      minAge: movie.minAge,
      sessions: movie.sessions.map((session) => ({
        id: session.id,
        date: session.date,
        timeSlot: session.timeSlot,
        room: session.room,
      })),
    };
  }

  async getMovie(id: string) {
    try {
      const movie = await this.movie.findById(id);
      return this.normalizeMovie(movie);
    } catch (error) {
      throw new BadRequestException('Could not find movie.');
    }
  }

  async getMovies() {
    const movies = await this.movie.find();
    return movies.map((movie) => this.normalizeMovie(movie));
  }

  async addMovie({ name, minAge, sessions }: AddMovieDto) {
    try {
      const newMovie = await this.movie.create({
        name,
        minAge,
        sessions: await Promise.all(
          sessions.map(async (session) => {
            return await this.session.create(session);
          }),
        ),
      });
      await newMovie.save();
      return this.normalizeMovie(newMovie);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateMovie({ id, name, minAge, sessions }: UpdateMovieDto) {
    const movie = await this.movie.findById(id);
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    if (name) movie.name = name;
    if (minAge) movie.minAge = minAge;
    if (sessions) {
      movie.sessions = await Promise.all(
        sessions.map(async (session) => {
          return await this.session.create(session);
        }),
      );
    }
    await movie.save();
    return this.normalizeMovie(movie);
  }

  async deleteMovie({ id }: DeleteMovieDto) {
    try {
      const movie = await this.movie.findById(id);
      if (!movie) {
        throw new BadRequestException('Movie not found');
      }

      await movie.deleteOne();
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
