/**
 * 类自动访问器装饰器是一种新的类元素类型
 * 他在类的字段前添加 accessor 关键字
 * 自动访问器自动为字段创建 getter 和 setter，并将默认值保存在私有槽中
 */

function logged(value, context) {
  console.log({value, context})
  if (context.kind === 'accessor') {
    const {get, set} = value
    return {
      get() {
        console.log('Getting value')
        return get.call(this)
      },
      set(value) {
        console.log('Setting value to', value)
        return set.call(this, value)
      },
      init(initialValue) {
        return initialValue
      }
    }
  }
}

class Person {
  @logged accessor name = 'default name'

  #x = 1// 使用私有字段存储值
  get x() {
    return this.#x
  }
  set x(v) {
    this.#x = v
  }
}
const p = new Person()
p.x = 2
console.log(p.x) // 2