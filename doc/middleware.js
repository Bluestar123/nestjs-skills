/**
 * express 中 next 是一个用于中间件处理的函数
 * 每个中间件接受三个参数：req, res, next
 * 中间件函数通过调用 next 可以将控制权传递给下一个中间件函数，如果中间没有调用next，请求请会挂起
 */

class Request {
  url
  constructor(url) {
    this.url = url
  }
}

class Response {
  send(message) {
    console.log(message)
  }
}

class Express {
  middlewares = []
  use(middleware) {
    this.middlewares.push(middleware)
  }

  handleRequest(req, res) {
    let index = 0
    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++]
        middleware(req, res, next)
      }
    }
    next()
  }
}
const app = new Express()

app.use((req, res, next) => {
  console.log('middleware1')
  next()
})
app.use((req, res, next) => {
  console.log('middleware2')
  next()
})
app.use((req, res, next) => {
  console.log('middleware3')
  res.send('hello world')
})

const req = new Request('/users')

const res = new Response()

app.handleRequest(req, res)