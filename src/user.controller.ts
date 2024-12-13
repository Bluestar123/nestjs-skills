import { Controller, Get, Request,Query, Req } from "@nestjs/common";
import {Request as ExpressRequest} from 'express';

@Controller('users')
export class UserController {
  @Get('req')
  handleRequest(@Req() req: ExpressRequest,age: number, @Request() request:ExpressRequest){
    console.log(req.url, req.method, req.path)
    console.log(age)
    return 'request'
  }

  @Get('query')
  handleQuery(@Query() query: any, @Query('id') id:string){
    console.log(query)
    console.log(id)
    return 'query'
  }
}