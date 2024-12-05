import { IsString, IsEmail, IsOptional } from 'class-validator';

export class createUserDto {
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}