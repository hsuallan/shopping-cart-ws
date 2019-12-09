const WebSocket = require("ws")
const http = require("http")
var fs = require("fs")
const PORT = process.env.PORT || 5000
//HTTP
const httpserver = http
  .createServer(function(req, res) {
    if (req.url == "/") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      let file = fs.createReadStream("index.html")
      file.pipe(res)
    }
  })
  .listen(PORT)
console.log("http server on" + PORT)
//WS
const wss = new WebSocket.Server({ server: httpserver })
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
    console.log(message)
  })
})
