/**
 * 在ts中， emitDecoratorMetadata 生成元数据有以下三种
 * design: type 用于属性类型元数据
 * design:paramtypes 用于构建函数或方法参数的元数据
 * design:returntype 用于方法的返回类型元数据
 * 
 *  "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
 */
import 'reflect-metadata';

function classDecorator(target) {}

function paramDecorator(target, propertyKey, parameterIndex) {}

function propDecorator(target, propertyKey) {}

function methodDecorator(target, propertyKey, descriptor) {}

class Test {
  log() {}
}

@classDecorator
class Person {
  @propDecorator
  name: string;

  constructor(
    @paramDecorator serviceA: Test,
    @paramDecorator serviceB: number
  ) {}

  @methodDecorator
  method(@paramDecorator serviceA: string): string {
    return 'method';
  }
}
const propertyType = Reflect.getMetadata(
  'design:type',
  Person.prototype,
  'name'
);

console.log({ propertyType });

// 获取构造行数的参数
const paramTypes = Reflect.getMetadata('design:paramtypes', Person);
console.log({ paramTypes });

const methodParamTypes = Reflect.getMetadata(
  'design:paramtypes',
  Person.prototype,
  'method'
);
console.log({ methodParamTypes });

const returnType = Reflect.getMetadata(
  'design:returntype',
  Person.prototype,
  'method'
);
console.log({ returnType });
