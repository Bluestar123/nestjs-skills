import { Controller,Post,Body,Response, Param,Get, Request,Query,Session,Ip, Headers,Req } from "@nestjs/common";
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';

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


  @Get('res')
  handleRes(@Response({passthrough:true}) res: ExpressResponse) {
    // 有些时候只是想单独添加相应头，不想处理其他内容
    // 需要配置属性，让nest处理其他操作
    res.setHeader('key', 'value')
    return 'response with passthrough'

    // return res.send('xx')
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Param() params: any){
    return 'user' + id
  }

  @Get('start/a*b')
  handleWildcard(){
    return 'wildcard'
  }

  // 请求体 需要使用中间件
  @Post('create')
  createUser(@Body() createUserDto, @Body('name') name: string) {
    console.log(createUserDto, name)
    return 'create user'
  }

}

/**
 * nestjs 中，一般来说一个实体会定义两个类型，一个是 dto，一个是 interface
 * dto 客户端向服务器提交的数据对象，比如说用户注册时{用户名，密码}
 * 然后服务器端一般会获取此 dto，然后保存到数据库中，保存时候还会加一些默认值，时间，id等
 * 还可能过滤字段，例如注册时候密码和确认密码，但是保存的时候只存储 密码
 * 数据库里保存的数据类型一般会定义为一个 interface
 *
 * UserDto {用户名，密码，确认密码} 跟客户端交互的临时类型，可能会变
 * userInterface {用户，密码，创建时间，更新时间}
 */