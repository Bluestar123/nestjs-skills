// 方法装饰器

// 1. 日志记录 AOP
/**
 * 
 * @param target 如果装饰的是类的静态方法，target是类本身，如果装饰是实例方法，target是类的原型
 * @param propertyKey 
 * @param descriptor 属性描述符
 * @returns 
 */
function log(target, propertyKey, descriptor) {
  // 获取老的函数
  const originalMethod = descriptor.value;
  // 重新定义函数
  descriptor.value = function(...args) {
    console.log('log start');
    const result = originalMethod.apply(this, args);
    console.log('log end');
    return result;
  }
  return descriptor;
}
class Calculator{
  @log
  add(a:number, b:number):number {
    return a + b;
  }
}
const calculator = new Calculator();
calculator.add(1, 2);