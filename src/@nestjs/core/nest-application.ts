import express, {Express} from 'express'
import { Logger } from './logger'

export class NestApplication {
  // 在内部 私有化一个 express 实例
  private readonly app: Express = express()

  constructor(protected readonly module) {
    
  }

  // 配置初始化工作，例如 路由
  async init() {

  }

  // 启动http服务, 监听 port 端口
  async listen(port) {
    await this.init()
    this.app.listen(port, () => {
      Logger.log('Application is running on port ' + port, 'NestApplication')
    })
  }
}