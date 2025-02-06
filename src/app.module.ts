import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  LoggerService,
  LoggerServiceProvide,
  UseValueService,
  UseFactory,
} from './logger.service';
// 把类标记为一个模块，这样 Nest 就知道如何处理它
@Module({
  // controllers 是一个数组，用于定义模块中的控制器
  controllers: [AppController, UserController],
  providers: [
    {
      provide: 'SUFFIX',
      useValue: 'suffix',
    },
    LoggerService, // token 就是类本身
    {
      //跟上面简写是一样的
      provide: LoggerServiceProvide,
      useClass: LoggerServiceProvide,
    },
    {
      provide: 'StringToken', // 令牌，用于标识提供者，provide 的名字
      useValue: new UseValueService(), // 可以直接提供一个值
    },
    {
      provide: 'FactoryToken',
      inject: ['inject1', 'SUFFIX'], // 可以注入 provider token
      useFactory: (...args) => {
        return new UseFactory(...args);
      },
    },
  ],
})
export class AppModule {}
