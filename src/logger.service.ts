import {Injectable} from '@nestjs/common'
/**
 *定义提供者provider， CatsService， 服务的消费者 CatsController
 */


// 如果想让这个类被别人使用，需要加上装饰器
// 在引用的地方，constructor 里使用，nestjs IOC 会自动注入，实例话
@Injectable()
export class LoggerService {

  log(message:string) {
    console.log(message)
  }

}


@Injectable()
export class UseValueService {
  useValue() {
    return 'useValue'
  }
}