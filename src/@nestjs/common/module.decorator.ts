import 'reflect-metadata';

interface ModuleMetadata {
  controllers?: Function[];
  providers?: any[];
  exports?: any[]; // 模块导出 自己的 providers
  imports?: any[]; // 导入其他模块，使用别的模块的 providers
}

export function Module(metadata: ModuleMetadata) {
  return function (target: any) {
    Reflect.defineMetadata('isModule', true, target);

    // 定义元数据
    Reflect.defineMetadata('controllers', metadata.controllers ?? [], target);

    // 类上保存了一个 providers 的数组，表示给此模块注入的元数据
    Reflect.defineMetadata('providers', metadata.providers ?? [], target);
    Reflect.defineMetadata('imports', metadata.imports ?? [], target);
    Reflect.defineMetadata('exports', metadata.exports ?? [], target);
  };
}
