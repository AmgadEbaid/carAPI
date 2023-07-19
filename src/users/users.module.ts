import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { user } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authService } from './auth.service';

import { CurentUserMiddleware } from './currentUser.Middelware.ts/currentUser.Middelware';
@Module({
  imports: [TypeOrmModule.forFeature([user])],
  controllers: [UsersController],
  providers: [UsersService, authService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurentUserMiddleware).forRoutes('*');
  }
}
