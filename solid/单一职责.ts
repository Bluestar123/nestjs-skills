// class User {
//   constructor(public name:string, public email :string) {
//   }
//   save() {

//   }
//   setEmail() {}
// }

class User {
  constructor(public name:string, public email :string) {
      }
}

class UserRepository {
  save(user: User) {
    // 保存用户
  }
}
class EmailService {
  sendEmail(user: User) {
    // 发送邮件
  }
}