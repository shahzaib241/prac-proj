import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { createUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() user: createUserDto): Promise<User> {
    return this.usersService.create(user)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string; }> {
    await this.usersService.remove(id)
    const message = "user removed"
    return {message}
  }
}
