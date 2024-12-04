import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Bookmark } from 'src/bookmarks/bookmarks.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Bookmark) private bookmarksRepository: Repository<Bookmark>,
    @InjectRepository(User) private usersRepository: Repository<User>  
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id
      },
      relations: ["bookmarks"]
    })
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user)
  }

  async update(id: string, user: Partial<User>) {
    const property = await this.usersRepository.findOne({
      where: {id}
    })
    return this.usersRepository.save({
      ...property,
      ...user
    })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}