import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto';
import { createErrorResponse, createSuccessResponse } from 'src/utilis/createApiResponse';
import { ErrorResponse, SuccessResponse } from 'src/dto/globalResponse.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async signIn (email: string, pass: string):Promise<SuccessResponse<{access_token: string}>> {
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }
        const payload = {userId: user.id}
        return createSuccessResponse(
            200,
            "logged in",
            {access_token: await this.jwtService.signAsync(payload)}
        )
    }

    async signUp (user: createUserDto):Promise<SuccessResponse<{access_token: string}>> {
        const createdUser = await this.usersService.create(user);
        const payload = {userId: createdUser.id}
        return createSuccessResponse(
            201,
            "signed up",
            {access_token: await this.jwtService.signAsync(payload)}
        )
    }
}
