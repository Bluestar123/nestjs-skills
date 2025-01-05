/**
 * 类之间的依赖关系应该建立在最小的接口上
 * 不应该强迫一个类依赖于他不使用的方法
 */

// interface Animal {
//   eat(): void
//   fly(): void
// }

// class Dog implements Animal {
//   eat() {
//     console.log('eat')
//   }
//   fly() {
//     throw new Error('I can not fly')
//   }
// }
interface Eater {
  eat(): void
}
interface Flyer {
  fly(): void
}
class Dog implements Eater {
  eat() {
    console.log('eat')
  }
}
class Bird implements Eater, Flyer {
  eat() {
    console.log('eat')
  }
  fly(): void {
    console.log('fly')
  }
}