import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signIn (email: string, pass: string) {
        const user = await this.usersService.findOneByEmail(email);
        //hash the password and match the hash password using bcrypt
        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }
        
        
    }
}
