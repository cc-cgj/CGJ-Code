import express from "express";
import cors from "cors";
import fs from "node:fs";
import crypto from "node:crypto";

const app = express();
app.use(cors());
app.use(express.json());

/** 静态资源缓存 css js png html */
// app.use(
//   express.static("static", {
//     maxAge: 1000 * 60 * 5, // 缓存时间 5分钟
//     lastModified: true, //协商缓存
//   })
// );

/**
 * 动态资源缓存 接口
 * */

/** 强缓存 */
// Expires
app.get("/expires", (req, res) => {
  res.setHeader("Expires", new Date("2024-5-15 17:27:00").toUTCString());
  res.send("hello");
});
// Cache-Control
// public 任何服务器都可以缓存包括代理服务器 CDN
// private 只能浏览器缓存,不包括代理服务器
// max-age 缓存时间 秒
// expires cache-control 同时出现,max-age优先级高
app.get("/cache-control", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=10");
  res.send("hello");
});

/** 协商缓存 */
/**
 * 强缓存跟协商缓存同时出现,浏览器优先于强缓存
 * 如何解决这个问题?
 * no-cache 告诉浏览器 我们要走协商缓存,别走强缓存
 * no-store 不走任何缓存,两个互斥
 */

// 获取文件的修改时间
const getFileModifyTime = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString();
};

// Last-Modified 设置文件最后的修改时间
app.get("/last-modified", (req, res) => {
  const ifModifiedSince = req.headers["if-modified-since"];
  const modifyTime = getFileModifyTime("./index.js");

  if (ifModifiedSince == modifyTime) {
    console.log("缓存了");
    res.status(304).end();
    return;
  }
  console.log("没缓存");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Last-Modified", modifyTime);
  res.send("hello");
});

// 获取文件的hash值
const getFileHash = (filePath) => {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
};

// ETag
app.get("/etag", (req, res) => {
  const ifNoneMatch = req.headers["if-none-match"];
  const fileHash = getFileHash("./index.js");

  if (ifNoneMatch == fileHash) {
    console.log("缓存了");
    res.status(304).end();
    return;
  }
  console.log("没缓存");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("ETag", fileHash);
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
