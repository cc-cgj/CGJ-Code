import http2 from "node:http2";
import fs from "node:fs";

// https 就可以访问h2版本
const server = http2.createSecureServer({
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
});


// http2 使用的是流的方式去传输的
server.on("stream", (stream, headers) => {
  stream.respond({
    "content-type": "text/html;charset=utf-8",
    ":status": 200,
  });
  stream.end("<h1>Hello World</h1>");
});


server.listen(9999,()=>{
  console.log("listen 9999");
})