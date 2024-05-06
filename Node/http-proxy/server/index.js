var http = require("node:http"),
  url = require("node:url"),
  httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({
  target: "http://192.168.1.230/zszlfx-lt",
});

var server = http.createServer(function (req, res) {
  // proxy.web(req, res, { target: "http://127.0.0.1:5050" });
  const { pathname } = url.parse(req.url);
  console.log(`pathname`, pathname);
  if (pathname == "/zszlfx-lt") {
    res.end("api代理3000端口成功");
  }
  res.end();
});

proxy.listen(8000);

server.listen(9001, () => {
  console.log("9001端口服务已启动");
});
