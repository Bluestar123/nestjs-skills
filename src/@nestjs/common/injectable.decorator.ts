import 'reflect-metadata'

// 给类用的
export function Injectable(): ClassDecorator {
  return function(target) {
    // 这个类是可以被注入的
    Reflect.defineMetadata('injectable', true, target)
  }
}