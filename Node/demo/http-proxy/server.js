const http = require("node:http");
const url = require("node:url");
http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname == "/api") {
      res.end("api代理3000端口成功");
    }
  })
  .listen(3000, () => {
    console.log("3000端口已启动");
  });
