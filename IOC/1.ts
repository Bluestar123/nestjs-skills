// 在没有 ioc 的时候，我们需要直接负责创建依赖对象

class Engine {
  start() {
    console.log('引擎启动')
  }
}

class Car {
  private engine: Engine
  constructor() {
    this.engine = new Engine()
  }

  drive() {
    this.engine.start()
    console.log('汽车启动')
  }
}

const car = new Car()
car.drive()