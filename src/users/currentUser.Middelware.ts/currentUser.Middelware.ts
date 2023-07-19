import { NestMiddleware, Injectable } from '@nestjs/common';
import { user } from '../user.entity';
declare global {
  namespace Express {
    interface Request {
      currentUser?: user;
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
@Injectable()
export class CurentUserMiddleware implements NestMiddleware {
  constructor(private UsersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.UsersService.findone(userId);
      req.currentUser = user;
    }

    next();
  }
}
