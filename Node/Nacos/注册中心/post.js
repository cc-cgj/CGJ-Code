import http from "node:http";

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ msg: "8080Server" }));
  })
  .listen(8080, () => {
    console.log("8080Server");
  });
