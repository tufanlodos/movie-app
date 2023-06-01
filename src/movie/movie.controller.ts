import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Role, RoleGuard } from 'src/auth';
import { MovieService } from './movie.service';
import { AddMovieDto, DeleteMovieDto, UpdateMovieDto } from './movie.dto';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Post()
  @UseGuards(new RoleGuard(Role.Manager))
  async addMovie(@Body() body: AddMovieDto) {
    return this.movieService.addMovie(body);
  }

  @Patch()
  @UseGuards(new RoleGuard(Role.Manager))
  async updateMovie(@Body() body: UpdateMovieDto) {
    return this.movieService.updateMovie(body);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(Role.Manager))
  async deleteMovie(@Param() param: DeleteMovieDto) {
    return this.movieService.deleteMovie(param);
  }
}
