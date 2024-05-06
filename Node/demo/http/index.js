const http = require("node:http");
const url = require("node:url");

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  console.log(pathname);
  if (request.method === "POST") {
    if (pathname === "/login") {
      let data = "";
      request.on("data", (chunk) => {
        data += chunk; //buffer
      });
      request.on("end", () => {
        response.setHeader("Content-Type", "application/json");
        response.statusCode = 200;
        response.end(data);
      });
    } else {
      response.statusCode = 404;
      response.end("404");
    }
  } else if (request.method === "GET") {
    if (pathname == "/get") {
      response.statusCode = 200
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(query));
    } else {
      response.statusCode = 404;
      response.end("404");
    }
  }
});

server.listen(3000, () => {
  console.log("服务已启动");
});
