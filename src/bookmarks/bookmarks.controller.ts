import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.entity';

@Controller('Bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarksService: BookmarksService) { }
  @Get()
  findAll(): Promise<Bookmark[]> {
    return this.bookmarksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bookmark> {
    return this.bookmarksService.findOne(id)
  }

  @Post(":userId")
  create(@Param('userId') userId: string, @Body() bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarksService.create(userId, bookmark)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookmark: Partial<Bookmark>): Promise<Bookmark> {
    return this.bookmarksService.update(id, bookmark)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string; }> {
    await this.bookmarksService.remove(id)
    const message = "user removed"
    return {message}
  }
}
