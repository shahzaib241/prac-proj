import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto';
import { SuccessResponse } from 'src/dto/globalResponse.dto';
import { RequestResponse } from 'src/utilis/response.interface';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async signIn (email: string, pass: string):Promise<RequestResponse<{access_token: string}>> {
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException("Wrong user credentials")
        }
        const payload = {userId: user.id}
        return {
            message: "loged in successfully",
            statusCode: 200,
            data: {access_token: await this.jwtService.signAsync(payload)}
        }
    }

    async signUp (user: createUserDto):Promise<{access_token: string}> {
        const createdUser = await this.usersService.create(user);
        const payload = {userId: createdUser.id}
        return {access_token: await this.jwtService.signAsync(payload)}

    }
}
