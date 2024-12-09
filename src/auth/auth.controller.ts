import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { SignUpDto } from './dto/SignUpDto.sto';
import { Public } from 'src/utilis/publicRoutes';
import { SuccessResponse } from 'src/dto/globalResponse.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('signin')
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
