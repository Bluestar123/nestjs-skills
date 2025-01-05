// 要求实体 应该对扩展开放，对修改关闭
// 通过拓展来实现新功能，而不是修改现有代码

// class Rectangel {
//   constructor(public width: number, public height: number) {}
// }

// class Circle {
//   constructor(public radius: number) {}
// }

// // 如果每次加类型就是修改代码，那么就是违反了开闭原则
// class AreaCalculator {
//   calc(shape) {
//     if (shape instanceof Rectangel) {
//       return shape.width * shape.height
//     }
//     if (shape instanceof Circle) {
//       return shape.radius * shape.radius * Math.PI
//     }
//   }
// }

interface Shape {
  calcArea() : number
}

class Rectangel implements Shape {
  constructor(public width: number, public height: number) {}
  calcArea(): number {
    return this.width * this.height
  }
}
class AreaCalc {
  static calcArea(shape: Shape) {
    return shape.calcArea()
  }
}
const res = AreaCalc.calcArea(new Rectangel(10, 5))
console.log(res) // 50