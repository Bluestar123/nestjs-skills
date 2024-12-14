// 导入模块NestFactory，用于创建 nest 应用实例
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from 'express-session'
// 创建根模块
// 定义一个一步函数，用来创建应用实例并启动

async function bootstrap() {
  // 创建 nest 应用实例，传入根模块
  const app = await  NestFactory.create(AppModule)
  app.use(session({
    secret: 'secret-key', // 加密的会话密钥
    resave: false, // 在每次请求结束后是否强制保存回话，即使他没有改变
    saveUninitialized: false, // 是否将未初始化的会话存储
    cookie: {
      maxAge: 1000 * 60 * 60 * 24// 有效期，单位毫秒
    }
  }))
  await app.listen(3000)
}
bootstrap()