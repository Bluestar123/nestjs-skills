// 方法装饰器实现缓存

function cache(target, propertyKey, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const cache = new Map<string, any>()
  descriptor.value = function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = originalMethod.apply(this, args)
    cache.set(key, result)
    return result
  }
  return descriptor
}

class MathOperations{
  @cache
  factorial(n:number) : number {
    if (n<1) return 1
    return n*this.factorial(n-1)
  }
}

const mathOperations = new MathOperations()
console.log(mathOperations.factorial(50)) // 120
console.log(mathOperations.factorial(50)) // 120