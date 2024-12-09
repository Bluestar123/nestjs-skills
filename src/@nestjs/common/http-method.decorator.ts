import 'reflect-metadata'

export function Get(path: string = ''):MethodDecorator {
  /**
   * 类原型
   * 方法名
   */
  return function (target: Function, key: string, descriptor: PropertyDescriptor) {
    // 只是找地方存储，不会污染原有的数据方法

    // descriptor.value 是 方法函数，给方法函数添加元数据
    Reflect.defineMetadata('path', path, descriptor.value)
    // 给方法函数添加元数据
    Reflect.defineMetadata('method', 'get', descriptor.value)
  }
}