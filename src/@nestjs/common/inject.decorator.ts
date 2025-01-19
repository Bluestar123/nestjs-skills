import 'reflect-metadata'

export function Inject(token): ParameterDecorator {
  // target 类本身，propertyKey 方法名，parameterIndex 参数索引
  return function(target:Object, propertyKey:string|symbol, parameterIndex:number) {
    // 取出被注注入到构造函数中的token数组
    const existingInjectedTokens = Reflect.getMetadata('injectedTokens', target) ?? []
    existingInjectedTokens[parameterIndex] = token
    Reflect.defineMetadata('injectedTokens', existingInjectedTokens, target)
  }
}