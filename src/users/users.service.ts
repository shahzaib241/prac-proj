import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Bookmark } from 'src/bookmarks/bookmarks.entity';
import { createUserDto } from './dto';
import { SuccessResponse } from 'src/dto/globalResponse.dto';
import { createSuccessResponse } from 'src/utilis/createApiResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<SuccessResponse<User>> {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ["bookmarks"]
    })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return createSuccessResponse(200, "user found", user)
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

  async update(id: string, user: Partial<User>): Promise<SuccessResponse<User>> {
    const property = await this.usersRepository.findOne({
      where: {id}
    })
    const updatedUser = await this.usersRepository.save({
      ...property,
      ...user
    })
    return createSuccessResponse(200, "user updated", updatedUser)
  }

  async remove(id: string): Promise<SuccessResponse<{data: null}>> {
    const user = await this.usersRepository.delete(id)
    return createSuccessResponse(200, "user removed", null)
  }
}
