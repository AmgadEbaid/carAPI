import {
  Controller,
  Session,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { createuser } from './users.dto/createuser.dto';
import { UsersService } from './users.service';
import { serialzer } from '../interseptors/serilizer.interseptors';
import { updatauser } from './users.dto/updateUser.dto';
import { userDto } from './users.dto/user.dto';
import { authService } from './auth.service';
import { CurentUser } from './current user decorator';
import { user } from './user.entity';
import { AuthGard } from '../gards/auth.gards';

@serialzer(userDto)
@Controller('auth')
export class UsersController {
  constructor(
    private UsersService: UsersService,
    private AuthService: authService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGard)
  whoami(@CurentUser() user: user) {
    return user;
  }

  @Post('/logout')
  logOut(@Session() Session: any) {
    Session.userId = null;
  }

  @Post('/sinin')
  async sinin(@Body() Body: createuser, @Session() Session: any) {
    const user = await this.AuthService.sinin(Body.email, Body.password);

    Session.userId = user.id;

    return user;
  }

  @Post('/sinup')
  async createuser(@Body() Body: createuser, @Session() Session: any) {
    const user = await this.AuthService.sinup(Body.email, Body.password);

    Session.userId = user.id;

    return user;
  }
  @Get('/users/:id')
  async findone(@Param('id') id: string, @Session() Session: any) {
    const user = await this.UsersService.findone(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Get('/users')
  find(@Query('email') email: string) {
    return this.UsersService.find(email);
  }

  @Delete('/users/:id')
  delete(@Param('id') id: string) {
    return this.UsersService.remove(+id);
  }

  @Patch('/users/:id')
  update(@Param('id') id: string, @Body() body: updatauser) {
    this.UsersService.updata(+id, body);
  }
}
