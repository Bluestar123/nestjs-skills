/**
 * ts 5+
 * stage 3 需要注视掉 或者false
 * "experimentalDecorators": false,
 * 
 * 
 * vscode 内部使用 tsServer 服务器进行代码检查
 * 
 * 固定两个参数 value context
 */

type ClassMethodDecorator = (value: Function, context: {
  kind: 'method', // class method getter setter field accessor
  name: string, 
  static: boolean, // 是否是静态属性
  private: boolean, // 是否是私有属性
}) => void | Function

function loggged(value, {kind, name}) {
  if (kind === 'method') {
    console.log(`Method ${name} has been decorated`)
    return function(...args) {
      console.log(`Arguments for ${name}: ${args}`)
      return value.apply(this, args)
    }
  }
}

class Person {
  @loggged
  testLog(a,b) {
    return a+b
  }
}
const p = new Person()
p.testLog(1,2) // 3
