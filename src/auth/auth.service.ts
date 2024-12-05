import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async signIn (email: string, pass: string):Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(email);
        //hash the password and match the hash password using bcrypt
        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }
        const payload = {userId: user.id}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp (user: createUserDto):Promise<{ access_token: string }> {
        const createdUser = await this.usersService.create(user);
        const payload = {userId: createdUser.id}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
