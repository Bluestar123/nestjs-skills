import { Controller, Param,Get, Request,Query,Session,Ip, Headers,Req } from "@nestjs/common";
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

  @Get('headers')
  handleHeaders(@Headers() headers: any, @Headers('host') host:string){
    console.log(headers)
    console.log(host)
    return 'headers'
  }

  @Get('session')
  handleSession(@Session() session: any, @Session('pageView') pageView: string){ 
    if (session.pageView) {
      session.pageView++
    } else {
      session.pageView = 1
    }
    console.log(session, pageView)

    return 'session' + session.pageView
  }

  @Get('ip')
  getUserIp(@Ip() ip: string){
    console.log(ip)
    return ip
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Param() params: any){
    return 'user' + id
  }

  @Get('start/a*b')
  handleWildcard(){
    return 'wildcard'
  }
}