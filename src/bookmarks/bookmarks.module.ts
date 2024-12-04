import { Module } from '@nestjs/common';
import { Bookmark } from './bookmarks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksService } from './bookmarks.service';
import { BookmarkController } from './bookmarks.controller';
import { User } from 'src/users/users.entity';

@Module({})
@Module({
    imports: [TypeOrmModule.forFeature([Bookmark, User])],
    controllers: [BookmarkController],
    providers: [BookmarksService]
  })
export class BookmarksModule { }
