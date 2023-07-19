import { createParamDecorator } from '@nestjs/common/decorators/http/create-route-param-metadata.decorator';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
export const CurentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.CurentUser;

    return request.currentUser;
  },
);
