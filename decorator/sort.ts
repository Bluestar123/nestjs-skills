/**
1. 属性装饰器、方法装饰器、访问装饰器 他们按照类中出现顺序从上往下依次执行
2. 类装饰器最后执行
3. 参数装饰器先于方法执行
4. 方法有多个参数，参数装饰器从右往左执行
 */
function classDecorator(target) {
  console.log('classDecorator');
}

function propertyDecorator(target, propertyKey) {
  console.log('propertyDecorator');
}
function propertyDecorator1(target, propertyKey) {
  console.log('propertyDecorator1');
}

function methodDecorator(target, propertyKey, descriptor) {
  console.log('methodDecorator');
}
function methodDecorator1(target, propertyKey, descriptor) {
  console.log('methodDecorator1');
}

function accessorDecorator(target, propertyKey, descriptor) {
  console.log('accessorDecorator');
}

function parametorDecorator(target, propertyKey, parameterIndex) {
  console.log('parametorDecorator');
}

@classDecorator
class Example {

  @methodDecorator
  @methodDecorator1
  method(@parametorDecorator param) {

  }

  @propertyDecorator
  @propertyDecorator1
  prop: string

  @accessorDecorator
  get myProps() {
    return this.prop
  }
}