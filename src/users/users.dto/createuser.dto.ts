import { IsString, IsEmail } from 'class-validator';


export class createuser {

    @IsEmail()
    email: string

    @IsString()
    password: string

}