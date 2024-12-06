// 类装饰器
function logClass(constructor: Function) {
  console.log('class created',constructor.name )
}

@logClass
class Person {
  constructor(public name: string) {
    this.name = name;
  }
}

// 类装饰器工厂, 可以接受参数
// 可以添加新的属性和方法，拓展类的功能
function logClassFactory(value: string) {
  return (constructor: Function) => {
    console.log(value, constructor.name)
  }
}

@logClassFactory('hello')
class Car {
  constructor(public brand: string) {
    this.brand = brand;
  }
}

function addTimestamp<T extends  {new (...args: any[])}>(constructor:T) {
  return class extends constructor {
    timestamp = Date.now();
  }
}

@addTimestamp
class Document {
  constructor(public title: string) {
    this.title = title;
  }
}
 // 类型合并
interface Document {
  timestamp: number;
}

const doc = new Document('my doc');
console.log(doc.timestamp);