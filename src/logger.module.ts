import { Module } from '@nestjs/common';
import {
  LoggerService,
  LoggerServiceProvide,
  UseValueService,
  UseFactory,
} from './logger.service';
@Module({
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
  // 需要导出。 可以放 module，也可以放 provider
  exports: [
    LoggerService,
    LoggerServiceProvide,
    'SUFFIX',
    'StringToken',
    'FactoryToken',
  ],
})
export class LoggerModule {}
