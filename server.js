const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
const { fs } = require('fs')
const YellowPage = require("eth-yellowpage").EthYellowPage;
const next = require('next')
const Web3 = require("web3")
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const rootStaticFiles = [
  '/favicon.ico',
  '/assets',
]

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
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
  .listen(3000, (err) => {
    if (err) throw err
    var eth = web3.eth
    var yellowPage = new YellowPage(web3.eth);


    console.log(yellowPage.address);
    console.log('> Ready on http://localhost')
  })
})
