import { Controller, Get, Inject } from '@nestjs/common';
import {
  LoggerService,
  UseFactory,
  LoggerServiceProvide,
  UseValueService,
} from './logger.service';
import { CommonService } from './common.service';

// @Inject() // 可以往这个类里注入，constructor 里使用，nestjs IOC 会自动注入，实例话
@Controller()
export class AppController {
  // 如果想要使用服务，需要在构造函数中注入服务
  // 同时要在 provider 中定义服务，这里才能ioc注入
  constructor(
    private loggerService: LoggerService,
    @Inject('StringToken') private useValueService: UseValueService, // 可以不写类型，写 类型是为了 ts 提示
    @Inject('FactoryToken') private factoryToken: UseFactory, // 可以从 Inject 的 provide 赋值
    private loggerServiceProvide: LoggerServiceProvide,
    private commonService: CommonService
  ) {}

  @Get('common')
  common() {
    this.commonService.log('common');
    return 'common';
  }
  @Get()
  index(): string {
    this.loggerService.log('index');
    this.useValueService.log('index');
    this.factoryToken.log('index');
    this.loggerServiceProvide.log('index');
    return 'Hello World!';
  }

  @Get('info')
  getInfo(): string {
    return 'Hello info!';
  }

  @Get('log')
  log() {
    this.loggerService.log('log');
    return 'log';
  }
}
