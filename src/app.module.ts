import {AppController} from "./app.controller"
import { Module } from '@nestjs/common';

// 把类标记为一个模块，这样 Nest 就知道如何处理它
@Module({
  // controllers 是一个数组，用于定义模块中的控制器
  controllers: [AppController],
})
export class AppModule {}