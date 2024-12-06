
// 替换类的构造函数
// 通过返回一个新的构造函数替换原有的构造函数
function replaceConstructor<T extends  {new (...args: any[])}>(constructor:T) {
  return class extends constructor {
    constructor(...args) {
      super(...args)
      console.log('instance created')
    }
  }
}

@replaceConstructor
class User {
  constructor(public name: string) {
    this.name = name;
    console.log('raw User')
  }
}


const doc = new User('my doc');