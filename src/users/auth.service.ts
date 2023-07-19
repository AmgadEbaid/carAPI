import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { buffer } from "stream/consumers";
import { run } from "node:test";
const scrypt = promisify(_scrypt)

@Injectable()
export class authService {

    constructor(private userService: UsersService) { }

    async sinup(email: string, password: string) {
        const users = await this.userService.find(email)
        if (users.length) {
            throw new BadRequestException("email is used")
        }

        const salt = randomBytes(8).toString("hex")
        const hash = await (scrypt(password, salt, 40)) as unknown as Buffer

        const ruslt = salt + "." + hash.toString('hex')

        const user = await this.userService.create(email, ruslt)
        return user
    }


    async sinin(email: string, password: string) {
        const [user] = await this.userService.find(email)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        const [salt, stordHash] = user.password.split('.')

        const hash = await scrypt(password, salt, 40) as unknown as Buffer

        if (stordHash == hash.toString("hex")) {
            return user

        } else {
            throw new NotFoundException("bad password")
        }
    }
}