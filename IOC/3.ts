/**
 * 3. ioc依赖注入
 * 对象的创建和管理权 被 反转给了容器，程序不用主动负责创建对象，而是被动接收容器创建好的对象
 * 
 * DI 依赖注入，实现IOC 的一种方式，通过 DI，我们将类的依赖注入到 类中，而不是在类中直接创建依赖
 */

import 'reflect-metadata'

// 如果想让这个类被别人使用，需要加上装饰器
function Injectable(target) {
  // 这里可以不写任何代码，次装饰器不需要执行任何操作，仅仅用于元数据的生成
}

// 定义依赖注入的容器
class DIContainer {
  // 存储所有的服务的map对象
  private services = new Map<string, any>()
  // 注册服务，把类的名称和构造函数存储到map对象中
  register<T>(name: string, Service: new (...args:any[]) => T) {
    // 把类的名称和构造函数存储到map对象中
    this.services.set(name, Service)
  }
  // 使用, 根据名称返回服务的实例
  resolve<T>(name: string) {
    const Service = this.services.get(name)
    // 获取实现类的构造函数的参数 // 新版stage，修改 tsconfig.json
    // 获取当前类的构造函数的参数，也就是依赖项。下面会先 new 执行
    const deps = Reflect.getMetadata('design:paramtypes', Service) ?? []// [Engine]
    // 递归解析所有依赖项
    const injections = deps.map(dep => this.resolve(dep.name))
    //{ injections: [], name: 'Engine' } 29 行执行先打印 Engine
    //{ injections: [ Engine {} ], name: 'Car' }
    console.log({injections, name})
    return new Service(...injections)
  }
}

@Injectable
class Oil {
  constructor(){}
}
@Injectable
class Engine {
  constructor(private oil: Oil) {}
  start() {
    console.log('引擎启动')
  }
}

@Injectable
class Car {
  // 创建car 依赖 engine
  // 参数通过元数据获取
  constructor(private  engine: Engine) {}

  drive() {
    this.engine.start()
    console.log('汽车启动')
  }
}
const container = new DIContainer()
container.register<Oil>('Oil', Oil)
container.register<Engine>('Engine', Engine)
container.register<Car>('Car', Car)

const car = container.resolve<Car>('Car')

car.drive() // 引擎启动 汽车启动