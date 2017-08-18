const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
var fs = require('fs')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const rootStaticFiles = [
  '/favicon.ico',
  '/assets',
]

/*
var ssl = {
  key: fs.readFileSync('./ssl/liukan.key', 'utf8'),
  cert: fs.readFileSync('./ssl/www.94eth.com.crt', 'utf8'),
  ca: [fs.readFileSync('./ssl/intermediate.crt', 'utf8'),
    fs.readFileSync('./ssl/root.crt', 'utf8')],
  passphrase: 'asdffa'
}*/

app.prepare()
.then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    if (rootStaticFiles.filter((file) => pathname.indexOf(file) > -1).length > 0) {
      const path = join(__dirname, 'static', pathname)
      app.serveStatic(req, res, path)
    } else if (pathname.indexOf('/posts') === 0) {
      query.fullUrl = pathname
      app.render(req, res, '/post', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(80, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost')
  })
})
