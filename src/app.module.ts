import {AppController} from "./app.controller"
import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import {LoggerService, UseValueService} from './logger.service'
// 把类标记为一个模块，这样 Nest 就知道如何处理它
@Module({
  // controllers 是一个数组，用于定义模块中的控制器
  controllers: [AppController, UserController],
  providers: [
    LoggerService,
    {
      provide: 'StringToken', // 令牌，用于标识提供者，provide 的名字
      useValue: new UseValueService() // 可以直接提供一个值
    }
  ]
})
export class AppModule {}