import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { createUserDto } from './dto';
import { Public } from 'src/auth/utils/publicRoutes';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll()
  // }
  
  @Get()
  findOne(@Request() req): Promise<User> {
    const userId = req.user.userId;
    return this.usersService.findOneById(userId)
  }

  @Put()
  update(@Request() req, @Body() user: User): Promise<User> {
    return this.usersService.update(req.user.userId, user)
  }

  @Delete()
  async remove(@Request() req): Promise<{ message: string; }> {
    await this.usersService.remove(req.user.userId)
    const message = "user removed"
    return {message}
  }
}
