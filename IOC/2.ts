// 构造函数注入

class Engine {
  start() {
    console.log('引擎启动')
  }
}

class Car {
  private engine: Engine
  constructor(engine: Engine) {
    this.engine = engine
  }

  drive() {
    this.engine.start()
    console.log('汽车启动')
  }
}

const car = new Car(new Engine())
car.drive()