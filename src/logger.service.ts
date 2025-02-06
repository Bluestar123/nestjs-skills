import { Inject, Injectable } from '@nestjs/common';
/**
 *定义提供者provider， CatsService， 服务的消费者 CatsController
 */

// 如果想让这个类被别人使用，需要加上装饰器
// 在引用的地方，constructor 里使用，nestjs IOC 会自动注入，实例话
@Injectable()
export class LoggerService {
  log(message: string) {
    console.log('loggerService', message);
  }
}

@Injectable()
export class LoggerServiceProvide {
  constructor(@Inject('SUFFIX') private suffix: string) {
    console.log('LoggerServiceProvide suffix', this.suffix);
  }
  log(message: string) {
    console.log('LoggerServiceProvide', message);
  }
}

@Injectable()
export class UseValueService {
  log(message: string) {
    console.log('UseValueService', message);
  }
}

@Injectable()
export class UseFactory {
  constructor(...args) {
    console.log('UseFactory', ...args);
  }

  log(message: string) {
    console.log('UseFactory', message);
  }
}
