import express from "express";

const app = express();

app.get("/jsonp", (req, res) => {
  const { callback } = req.query;
  res.send(`${callback}('Hello World!')`);
});

app.get("/json", (req, res) => {
  console.log(req.headers);
  // 该函数用于设置HTTP响应头中的"Access-Control-Allow-Origin"字段为"*"，表示允许任何来源的跨域请求访问该资源。
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.json({
    message: "Hello World!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
