import { Controller, Get, Inject } from "@nestjs/common";
import { LoggerService, UseValueService } from "./logger.service";


// @Inject() // 可以往这个类里注入，constructor 里使用，nestjs IOC 会自动注入，实例话
@Controller()
export class AppController {
  // 如果想要使用服务，需要在构造函数中注入服务
  // 同时要在 provider 中定义服务，这里才能ioc注入
  constructor(private  loggerService: LoggerService, @Inject('StringToken')  private useValueService:UseValueService) {}
  @Get()
  index(): string {
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