/**
 * 此原则要求子类必须覆盖掉他们的基类
 * 这意味着字类应该在任何地方替换掉其基类，并且不会导致程序出错
 */
// class Bird {
//   fly(){
//     console.log('I can fly');
//   }
// }

// class Duck extends Bird {
//   fly(){
//     throw new Error('I can not fly');
//   }
// }
// function move(bird: Bird){
//   bird.fly()
// }
// move(new Duck()) // I can not fly

class Bird {
  move() {

  }
}
class FlyBird extends Bird {
  move() {
    console.log('I can fly');
  }
}
class WalkBird extends Bird {
  move() {
    console.log('I can walk');
  }
}
function move(bird: Bird) {
  bird.move()
}
move(new FlyBird()) // I can fly
move(new WalkBird()) // I can walk