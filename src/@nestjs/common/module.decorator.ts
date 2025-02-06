import 'reflect-metadata';

interface ModuleMetadata {
  controllers: Function[];
  providers: any[];
}

export function Module(metadata: ModuleMetadata) {
  return function (target: any) {
    // 定义元数据
    Reflect.defineMetadata('controllers', metadata.controllers, target);

    // 类上保存了一个 providers 的数组，表示给此模块注入的元数据
    Reflect.defineMetadata('providers', metadata.providers, target);
  };
}
