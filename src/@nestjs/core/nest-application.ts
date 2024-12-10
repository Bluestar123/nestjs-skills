import { AppController } from './../../app.controller';
import 'reflect-metadata'
import express, {Express,NextFunction,Response, Request} from 'express'
import { Logger } from './logger'
import path from 'path';

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

      // Reflect.getPrototypeOf(controller) === Controller.prototype
      const controllerPrototype = Reflect.getPrototypeOf(controller)
      for(const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
        // 原型上 index
        const method = controllerPrototype[methodName]
        const httpMethod = Reflect.getMetadata('method', method)
        const pathMetadata = Reflect.getMetadata('path', method)
        if (!httpMethod) {
          // 不是 Get Post
          continue
        }
        /**
         * const app = express()
         * app.get('/path', (req, res) => {})
         * 
         * path.posix 用于处理跨平台路径，例如 windows 和 linux，统一使用 /
         */
        const routePath = path.posix.join('/',prefix, pathMetadata)
        // 当客户端1️⃣ httpmethod 方法请求 routePath 路径时，执行 controller 的 method 方法
        this.app[httpMethod.toLowerCase()](routePath, (req: Request, res:Response, next: NextFunction) => {
          const result = method.call(controller, req, res, next)
          res.send(result)
        })
        Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RouteResolver')
      }

      Logger.log(`Nest application successfully started`, 'NestApplication')

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