import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoggerModule } from './logger.module';
import { CoreModule } from './core.module';

// 把类标记为一个模块，这样 Nest 就知道如何处理它
@Module({
  // controllers 是一个数组，用于定义模块中的控制器
  controllers: [AppController, UserController],
  // 如果想使用倒入模块里的 providers
  // LoggerModule 里需要导出 providers 子集
  // 导入的只能是 模块
  imports: [LoggerModule, CoreModule],
})
export class AppModule {}
