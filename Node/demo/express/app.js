import express from "express";

import User from "./src/user.js";
import List from "./src/list.js";
import LoggerMiddleware from "./middleware/logger.js";
import PreventHotLinking from "./middleware/preventHotLinking.js";

const app = express();

// 防盗链 //要在静态资源中间件注册前
app.use(PreventHotLinking);
// 静态资源
// app.use(express.static("public"));
app.use("/static", express.static("public"));

// 支持post请求解析json
app.use(express.json());
// 为所有请求添加日志系统
app.use(LoggerMiddleware);
app.use("/user", User);
app.use("/list", List);

// 接受参数: req.query
app.get("/get", (req, res) => {
  console.log(req.query);
  res.send("get");
});

// 接受参数: req.body
app.post("/post", (req, res) => {
  console.log(req.body);
  res.send("post");
});

// 动态参数
// 接受参数: req.params
app.get("/get/:id", (req, res) => {
  console.log(req.params);
  res.send("动态参数");
});

app.use("*", (req, res, next) => {
  // * 允许所有资源访问, 如果支持session，设置了* 则获取不到session
  // 指定ip或者网址
  // res.setHeader("Access-Control-Allow-Origin", "*"); // * | Origin
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:54427");
  // Access-Control-Allow-Methods 默认只支持get post head
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  // 支持application/json
  // 需设置Access-Control-Allow-Headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 预检请求 OPTIONS 请求，这个东西是浏览器发起的
// 满足以下条件才会发起：
// 1. Content-Type: application/json
// 2. 或者是自定义请求头
// 3. 非普通请求 patch put delete

app.get("/info", (req, res) => {
  // 自定义响应头
  res.set("cgj", "xxxx");
  // 抛出自定义响应头 xx,xx
  res.set("Access-Control-Expose-Headers", "cgj");
  res.json({
    code: 200,
    type: "get",
  });
});

app.patch("/info", (req, res) => {
  res.json({
    code: 200,
    type: "patch",
  });
});

app.post("/info", (req, res) => {
  res.json({
    code: 200,
    type: "post",
  });
});

// webSocket 实时通讯，前后端可以实时相互发消息
// 全双工通讯

// 大屏的项目 后端需要实时返回 前端不需要传什么东西 SSE
// 后端可以给前端实时返回 前端不能给后端实时操作
// 单工通讯

// sse -> server sent event
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  const timer = setInterval(() => {
    res.write("event: test\n");
    res.write("data: " + Date.now() + "\n\n");
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
  }, 10000);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
