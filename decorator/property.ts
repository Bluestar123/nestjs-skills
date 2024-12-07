import { DefaultValuePipe } from '@nestjs/common'
import 'reflect-metadata'
// 装饰类的属性
/**
 * 
 * @param target 静态属性是 类的构造函数，实例属性是类的原型对象
 * @param propertyKey 
 */
function required(target, propertyKey){
  console.log(target === User.prototype) // true
  // 给 target 的 propertyKey 属性定义元数据 是必传的
  Reflect.defineMetadata('required', true, target, propertyKey) // 描述的
}

function validate(user: User) {
  for(let key in user){ 
    // 上面添加到类圆形上了，此处通过实例取没问题，会找到原型链上
    if(Reflect.getMetadata('required', user, key)){
      if(!user[key]){
        throw new Error(`${key} is required`)
      }
    }
  }
}

class User{
  @required
  username: string

}
const user = new User()
user.username = 'bb'
validate(user) // username is required




// 进行访问控制或者设置初始设置

function defaultValue(value: any) {
  return function(target, propertyKey) {
    let val = value
    const getter = function() {
      return val
    }
    const setter = function(newVal) {
      val = newVal
    }
    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter
    })
  }
}
class Setting {
  @defaultValue('dark')
  theme: string
  @defaultValue(1000)
  timeout: number
}

const settings = new Setting()

console.log(settings.theme) // dark
console.log(settings.timeout) // dark