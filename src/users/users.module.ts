import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Bookmark } from 'src/bookmarks/bookmarks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark])],
  controllers: [UserController],
  providers: [UsersService]
})
export class UsersModule { }
