import { Logger,NestApplication } from ".";

export class NestFactory {
  static async create(module) {
    // 启动 nest 应用
    Logger.log('starting nest application', 'NestFactory')
    // 创建 nest 实例，返回
    const app = new NestApplication(module)
    return app
  }
}