import {createParamDecorator} from '@nestjs/common';

// 参数装饰器
export const User = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest()
  return  data ? req.user[data] : req.user
})