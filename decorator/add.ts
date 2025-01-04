/**
 * addInitializer
 * 是一个允许在类或类成员完成定义后运行额外的初始化逻辑的函数
 */

function withLogin(value, context) {
  console.log({context})
  if (context.kind === 'class') {
    context.addInitializer(function() {
      // 先执行
      console.log('MyClass addInitializer')
    })
  }
}

@withLogin
class MyClass {
  constructor() {
    // 后执行
    console.log('MyClass constructor')
  }
}
new MyClass()