import 'reflect-metadata'

interface ModuleMetadata {
  controllers: Function[]
}

export function Module(metadata:ModuleMetadata) {
  return function (target: any) {}
}