// 导入模块NestFactory，用于创建 nest 应用实例
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// 创建根模块
// 定义一个一步函数，用来创建应用实例并启动

async function bootstrap() {
  // 创建 nest 应用实例，传入根模块
  const app = await  NestFactory.create(AppModule)

  await app.listen(3000)
}

bootstrap()