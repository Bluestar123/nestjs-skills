import 'reflect-metadata'

interface ControllerOptions{
  prefix?: string
}

// 函数重载
export function Controller(): ClassDecorator // 传空
export function Controller(prefix: string): ClassDecorator // 路径前缀
export function Controller(options:ControllerOptions): ClassDecorator

// controller 传递 路径前缀
export function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
  let options: ControllerOptions = {}
    if (typeof prefixOrOptions === 'string') {
      options.prefix = prefixOrOptions
    } else if (typeof prefixOrOptions === 'object') {
      options = prefixOrOptions
    }
  // 类装饰器
  return function (target: Function) {
    Reflect.defineMetadata('prefix', options.prefix || '', target)
  }
}
