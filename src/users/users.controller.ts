import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { SuccessResponse } from 'src/dto/globalResponse.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll()
  // }
  
  @Get()
  findOne(@Request() req): Promise<SuccessResponse<User>> {
    const userId = req.user.userId;
    return this.usersService.findOneById(userId)
  }

  @Put()
  update(@Request() req, @Body() user: User): Promise<SuccessResponse<User>> {
    return this.usersService.update(req.user.userId, user)
  }

  @Delete()
  async remove(@Request() req): Promise<{ message: string; }> {
    await this.usersService.remove(req.user.userId)
    const message = "user removed"
    return {message}
  }
}
