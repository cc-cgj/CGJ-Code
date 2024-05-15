import express from "express";
import Redis from "ioredis";
import fs from "node:fs";

const lua = fs.readFileSync("./index.lua", "utf-8");

const redis = new Redis();
const app = express();

// 限流阀
const KEY = "lottery"; // redis存的值
const TIME = 30; //三十秒内的操作时间
const LIMIT = 5; //擦做了5次

// 跨域
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/lottery", (req, res) => {
  // 1是Lua脚本的内容、执行的键（KEY）、参数（TIME, LIMIT）
  redis.eval(lua, 1, KEY, TIME, LIMIT, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (data == 1) {
        res.send("抽奖成功");
      } else {
        res.send("请稍后重试!");
      }
    }
  });
});

app.listen(3000, () => {
  console.log("listen 3000");
});
