import 'reflect-metadata'

interface ModuleMetadata {
  controllers: Function[]
}

export function Module(metadata:ModuleMetadata) {
  return function (target: any) {
    // 定义元数据
    Reflect.defineMetadata('controllers', metadata.controllers, target)
  }
}