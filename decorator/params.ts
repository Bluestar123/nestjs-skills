import 'reflect-metadata'
// 参数装饰器
// 用于装饰 类的构造函数或方法的参数
// 用来实现在方法调用时验证参数的值

const REQUIRED_PARAMETERS = 'REQUIRED_PARAMETERS'

/**
 * 
 * @param target 装饰的目标对象，静态成员就是类的构造函数，实例成员就是类的原型对象
 * @param propertyKey 参数方法名称
 * @param parameterIndex 参数在参数列表中的索引 0
 */
function validate(target, propertyKey, parameterIndex) {
  console.log(target, propertyKey, parameterIndex)
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(REQUIRED_PARAMETERS, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(REQUIRED_PARAMETERS, existingRequiredParameters, target, propertyKey)
}


function validateParameters(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value
  descriptor.value = function(...args) {
    const existingRequiredParameters: number[] = Reflect.getOwnMetadata(REQUIRED_PARAMETERS, target, propertyKey) || []
    for (let index of existingRequiredParameters) {
      if (index >= args.length || args[index] === undefined) {
        throw new Error(`Missing required parameter at index ${index}`)
      }
    }
    return originalMethod.apply(this, args)
  }
  return descriptor
}

class User {
  constructor(private name:string, private age: number) {

  }
  @validateParameters
  setName( newName:string, @validate age: number) {
    this.name = newName
    this.age = age
  }
}

const user = new User('aa',1)
user.setName('a',11)
// user.setName(undefined)