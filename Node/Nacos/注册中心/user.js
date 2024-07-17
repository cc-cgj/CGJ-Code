import http from "node:http";
http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ msg: "8081Server" }));
  })
  .listen(8081, () => {
    console.log("8081Server");
  });
