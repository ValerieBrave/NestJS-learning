import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FormPost = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return {
          name: request.body.name,
          email: request.body.email,
          birthday: request.body.birthday,
          password: request.body.password,
          files: request.files
      }
    },
);