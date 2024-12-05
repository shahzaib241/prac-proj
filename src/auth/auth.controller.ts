import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { SignUpDto } from './dto/SignUpDto.sto';
import { Public } from './utils/publicRoutes';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
