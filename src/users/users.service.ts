import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ["bookmarks"]
    })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async create(user: createUserDto): Promise<User>{
    const newUser = await this.usersRepository.save(user);
    return newUser
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const property = await this.usersRepository.findOne({
      where: {id}
    })
    const updatedUser = await this.usersRepository.save({
      ...property,
      ...user
    })
    return updatedUser
  }

  async remove(id: string): Promise<string> {
    const user = await this.usersRepository.delete(id)
    return "user removed"
  }
}
