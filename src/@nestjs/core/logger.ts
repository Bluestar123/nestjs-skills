import clc from 'cli-color'

export class Logger {
  // context: RouterExplorer  NestFactory  类别
  static log(message: string, context: string = '') {
    const timestamp = new Date().toLocaleString()
    // 当前进程 id
    const pid = process.pid

    console.log(`[${clc.green('Nest')}] ${clc.green(pid.toString())}  - ${clc.yellow(timestamp)}     LOG [${context}] ${message}`)
  }
}