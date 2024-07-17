import http from "node:http";

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end("普通的一个node服务");
  })
  .listen(6000, () => {
    console.log("普通服务启动成功");
  });
