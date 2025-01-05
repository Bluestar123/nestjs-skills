/**
 * 要求高层模块不应该依赖底层模块，两者都应该依赖抽象，就是接口或者抽象类
 * 依赖关系应该通过抽象实现，而不是通过具体来实现
 */

// class MySql {
//   connect() {
//     console.log('连接到数据库');
//   }
//   save(user) {

//   }
// }

// class UserRepository {
//   private db: MySql

//   constructor() {
//     this.db = new MySql()
//   }
//   save(user) {
//     this.db.connect()
//     this.db.save(user)
//   }
// }

interface DB {
  connect(): void
  save(user: {}): void
}
class UserRepository {
  constructor(private db: DB) {}
  save(user) {
    this.db.connect()
    this.db.save(user)
  }
}

class MySql implements DB {
  connect() {
    console.log('连接到数据库');
  }
  save(user) {
    console.log('保存用户');
  }
}
const mySql = new MySql()
const user = new UserRepository(mySql)