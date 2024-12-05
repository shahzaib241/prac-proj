import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmarks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark) private bookmarksRepository: Repository<Bookmark>,
    @InjectRepository(User) private userRepository: Repository<User>
) {}

  async create(userId: string, bookmark: Bookmark): Promise<Bookmark> {
    const user = await this.userRepository.findOne({
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new NotFoundException("user not found");
    }
    const newBookmark = this.bookmarksRepository.create({...bookmark})
    return this.bookmarksRepository.save(newBookmark)
  }

  async update(id: string, user: Partial<Bookmark>) {
    const property = await this.bookmarksRepository.findOne({
      where: {id}
    })
    return this.bookmarksRepository.save({
      ...property,
      ...user
    })
  }
  
  async remove(id: string): Promise<void> {
    await this.bookmarksRepository.delete(id)
  }
}
