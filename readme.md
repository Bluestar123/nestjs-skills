## Nest 的依赖包
- @nestjs/core nestjs核心模块，提供构建、启动和管理 nestjs 应用程序的基础设施
- @nestjs/common 包含了构建 nestjs 应用程序基础设施和常用装饰器，像控制器、服务、中间件、首位、拦截器、管道、异常过滤器等
- rxjs 用于构建异步和事件驱动的库
- reflect-metadata 实现元编程的库，提供元数据
- @nestjs/platform-express nest的 express平台适配器，提供中间件，路由等


- npm i -D tsconfig-paths
- nodemon -r tsconfig-paths/register src/main.ts, 别名解析。配置别名后 希望读取本地代码
- -r required, 预处理，在执行


## Providers
- 定义 provider 类，使用 @Injectable 装饰
- 在 Module 里注册 Provider 类
- 在控制器里面使用或声明 provider 类