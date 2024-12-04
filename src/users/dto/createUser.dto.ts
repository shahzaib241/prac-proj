import { IsString, IsUUID, IsEmail } from 'class-validator';

export class createUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName?: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}