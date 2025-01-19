import { Session } from '@nestjs/common';
import { AppController } from './../../app.controller';
import 'reflect-metadata'
import express, {Express,NextFunction,Response, Request} from 'express'
import { Logger } from './logger'
import path from 'path';

export class NestApplication {
  // 在内部 私有化一个 express 实例
  private readonly app: Express = express()

  constructor(protected readonly module) {
    // 解析 post body 中间件
    this.app.use(express.json()) // 把 json 格式 请求踢对象放在 req.body 上
    this.app.use(express.urlencoded({extended: true})) // 把form 表单格式请求体放在 req.body 上

    // 测试 
    this.app.use((req, res, next) => {
      req.user = {a: 1, b: 2}
      next()
    })
  }

  private resolveDeps(Controller) {
    // 拿到 @Inject 装饰器的参数
    const injectedTokens = Reflect.getMetadata('injectedTokens', Controller) ?? []
    // 获取构造函数里没有被 @Inject 装饰器装饰的参数
    const constructorParams = Reflect.getMetadata('design:paramtypes', Controller) ?? []
    console.log({injectedTokens,constructorParams })
    return constructorParams.map((param, index) => {
      return injectedTokens[index] ?? param
    })
  }

  // 配置初始化工作，例如 路由
  async init() {
    // 取出模块里所有控制器，做好路由配置
    // 1. 取出所有控制器
    const controllers = Reflect.getMetadata('controllers', this.module) || []
    Logger.log(`AppModule dependencies initialized`, 'InstanceLoader')

    // 遍历控制器，配置路由
    for(const Controller of controllers) {
      // 解析出 控制器的依赖
      const deps = this.resolveDeps(Controller)
      // 创建每个控制器实例
      const controller  = new Controller(...deps)
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

        const redirectUrl = Reflect.getMetadata('redirectUrl', method)
        const redirectStatusCode = Reflect.getMetadata('redirectStatusCode', method)

        const statusCode = Reflect.getMetadata('statusCode', method)

        const headers = Reflect.getMetadata('headers', method) ?? []
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
          const args = this.resolveParams(controller, methodName, req, res, next)
          const result = method.call(controller, ...args)
          if (result?.url) {
            return res.redirect(result.statusCode,result.url)
          }
          // 如果需要重定向，就重定向到 redirectUrl
          if (redirectUrl) {
            return res.redirect(redirectStatusCode, redirectUrl)
          }

          if (statusCode) {
            res.statusCode = statusCode
          } else if (httpMethod === 'POST') {
            // post 请求状态吗默认都是 201
            res.statusCode = 201
          }
          // 判断 controller 的methodName 方法里有没使用 Res 或 Response 装饰器，如果用了，就业务自己处理返回
          const responseMetadata = this.getResponseMetadata(controller, methodName)
          // 没有response 装饰器，或者注入了同时设置了 passthrough 属性，都会 nestjs 接管响应
          if (!responseMetadata || responseMetadata.data?.passthrough) {
            headers.forEach(({name, value}) => {
              res.setHeader(name, value)
            });
            // 返回给客户端
            res.send(result)
          }
        })
        Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RouteResolver')
      }

      Logger.log(`Nest application successfully started`, 'NestApplication')

    }
  }
  private getResponseMetadata(controller, methodName) {
    const paramsMetaData =  Reflect.getMetadata(`params:${methodName}`, controller, methodName) ?? []
    // 卡住，等待 next
    return paramsMetaData.filter(Boolean).find(param => ['Response', 'Res', 'Next'].includes(param.key))
  }

  resolveParams(instance, methodName, req, res, next) {
    console.log(`params:${methodName}`,23 )

    const paramsMetaData = Reflect.getMetadata(`params:${methodName}`, instance, methodName) ?? []
    // sort((a, b) => a.parameterIndex - b.parameterIndex)
    // 使用 arr[1] = {} 形式 不需要排序
    // arr[0, empty, 2]  map 不影响
    return paramsMetaData.map(param => {
      const {key, data, factory} = param
      const ctx = {
        // 因为 nestjs 不仅支持 http，还支持 graphql，微服务 等，所以需要提供一个统一的上下文对象,switchToHttp方法
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => res,
          getNext: () => next
        })
      }
      switch(key) {
        case 'Request':
        case 'Req':
          return req
        case 'Response':
        case 'Res':
          return res
        case 'Query':
          if (data) {
            return req.query[data]
          }
          return req.query
        case 'Headers':
          if (data) {
            return req.headers[data]
          }
          return req.headers
        case 'Session':
          if (data) {
            return req.session[data]
          }
          return req.session
        case "Ip":
          return req.ip
        case 'Body':
          if (data) {
            return req.body[data]
          }
          return req.body
        case 'Param':
          if (data) {
            return req.params[data]
          }
          return req.params
        case 'Next':
          return next
        case 'DecoratorFactory':
          return factory(data,ctx)
        default:
          return null
      }
    })
  }

  use(middleware: any) {
    this.app.use(middleware)

  }

  // 启动http服务, 监听 port 端口
  async listen(port) {
    await this.init()
    this.app.listen(port, () => {
      Logger.log('Application is running on port ' + port, 'NestApplication')
    })
  }
}