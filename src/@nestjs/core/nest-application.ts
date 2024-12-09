import { AppController } from './../../app.controller';
import 'reflect-metadata'
import express, {Express} from 'express'
import { Logger } from './logger'

export class NestApplication {
  // 在内部 私有化一个 express 实例
  private readonly app: Express = express()

  constructor(protected readonly module) {
    
  }

  // 配置初始化工作，例如 路由
  async init() {
    // 取出模块里所有控制器，做好路由配置
    // 1. 取出所有控制器
    const controllers = Reflect.getMetadata('controllers', this.module) || []
    Logger.log(`AppModule dependencies initialized`, 'InstanceLoader')

    // 遍历控制器，配置路由
    for(const Controller of controllers) {
      // 创建每个控制器实例
      const controller  = new Controller()
      // 取出控制器的前缀
      const prefix = Reflect.getMetadata('prefix', Controller) || '/'

      Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver')

    }
  }

  // 启动http服务, 监听 port 端口
  async listen(port) {
    await this.init()
    this.app.listen(port, () => {
      Logger.log('Application is running on port ' + port, 'NestApplication')
    })
  }
}