import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, TokenPayload, User } from 'src/common';
import { WatchService } from './watch.service';
import { WatchDto } from './watch.dto';

@Controller('watch')
@UseGuards(AuthGuard)
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @Get('history')
  async getWatchHistory(@User() tokenPayload: TokenPayload | undefined) {
    return this.watchService.getWatchHistory(tokenPayload.userId);
  }

  @Post()
  async watchMovie(
    @Body() body: WatchDto,
    @User() tokenPayload: TokenPayload | undefined,
  ) {
    return this.watchService.watchMovie(body, tokenPayload);
  }
}
