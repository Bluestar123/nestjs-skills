import { Controller, Get, Request, Req } from "@nestjs/common";
import {Request as ExpressRequest} from 'express';

@Controller('users')
export class UserController {
  @Get('req')
  handleRequest(@Req() req: ExpressRequest,age: number, @Request() request:ExpressRequest){
    console.log(req.url, req.method, req.path)
    console.log(age)
    return 'request'
  }
}