import 'reflect-metadata'

export const createParamDecorator = (keyOrFactory:string | Function) => {
  // propertyKey 方法名
  // data 是传参  @Query('id')
  return (data?:any) => (target, propertyKey: string, parameterIndex: number) => {
    const keyName = `params:${propertyKey}`
    const existingParameter = Reflect.getMetadata(keyName, target, propertyKey) || []
    // 数组里放的是，那个位置使用的那个装饰器【Req, Request,Query】
    // [{parameterIndex: 0, key: 'Req'}, {parameterIndex: 1, key: 'Request'}]
    // existingParameter.push({parameterIndex, key})
    if (keyOrFactory instanceof Function) {
      // 自定义装饰器，传一个函数，key 当标识
      existingParameter[parameterIndex] = {parameterIndex, key:'DecoratorFactory', factory: keyOrFactory ,data}
    } else {
      existingParameter[parameterIndex] = {parameterIndex, key:keyOrFactory, data}
    }
    Reflect.defineMetadata(keyName, existingParameter, target, propertyKey)
  }
}
// Request =>   () => (target, propertyKey: string, parameterIndex: number) => {}
export const Request = createParamDecorator('Request')
export const Req = createParamDecorator('Req')
export const Query = createParamDecorator('Query')
export const Headers = createParamDecorator('Headers')
export const Session = createParamDecorator('Session')
export const Ip = createParamDecorator('Ip')
export const Param = createParamDecorator('Param')
export const Body = createParamDecorator('Body')
export const Response = createParamDecorator('Response')
export const Res = createParamDecorator('Res')
export const Next = createParamDecorator('Next')