import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MOVIE_MODEL_NAME, Movie } from './movie.model';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MOVIE_MODEL_NAME) private readonly movie: Model<Movie>,
  ) {}

  async getMovies() {
    const products = await this.movie.find();
    return products;
  }
}
