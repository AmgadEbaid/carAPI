import { IsString, IsEmail, IsOptional } from 'class-validator';
export class updatauser {

    @IsEmail()
    @IsOptional()
    email: string


    @IsOptional()
    @IsString()
    password: string

}