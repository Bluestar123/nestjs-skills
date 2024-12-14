import 'reflect-metadata'

export const createParamDecorator = (key:string) => {
  // propertyKey 方法名
  // data 是传参
  return (data?:any) => (target, propertyKey: string, parameterIndex: number) => {
    const keyName = `params:${propertyKey}`
    const existingParameter = Reflect.getMetadata(keyName, target, propertyKey) || []
    // 数组里放的是，那个位置使用的那个装饰器【Req, Request,Query】
    // [{parameterIndex: 0, key: 'Req'}, {parameterIndex: 1, key: 'Request'}]
    // existingParameter.push({parameterIndex, key})
    existingParameter[parameterIndex] = {parameterIndex, key, data}
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