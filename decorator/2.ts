import 'reflect-metadata'

class MyClass {
  private myProperty: string;
  constructor(value: string) {
    this.myProperty = value;
  }

  @Reflect.metadata('customKey', 'customValue')
  myMethod() { // 该方法是在类的原型上定义的
    console.log('executing myMethod');
  }
}

const instance = new MyClass('Hello');

// 1. 定义元数据
Reflect.defineMetadata('key1', 'value1', instance);

// 2.检查是否具有指定的元数据
const hasMetadata = Reflect.hasMetadata('key1', instance);

console.log(instance);

console.log(hasMetadata); // true

// 3.获取元数据
const metadata = Reflect.getMetadata('key1', instance);
console.log(metadata); // value1

// 4.获取自有元数据
const ownMetadata = Reflect.getOwnMetadata('customKey', Reflect.getPrototypeOf(instance), 'myMethod');
console.log(ownMetadata); // undefined

const ownMetadata2 = Reflect.getOwnMetadata('customKey', MyClass.prototype, 'myMethod');
console.log(ownMetadata2); 