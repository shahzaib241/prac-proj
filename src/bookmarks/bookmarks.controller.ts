import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.entity';

@Controller('Bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarksService: BookmarksService) { }

  @Post()
  create(@Request() req, @Body() bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarksService.create(req.user.userId, bookmark)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookmark: Partial<Bookmark>): Promise<Bookmark> {
    return this.bookmarksService.update(id, bookmark)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string; }> {
    await this.bookmarksService.remove(id)
    const message = "bookmark removed"
    return {message}
  }
}
