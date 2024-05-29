import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const fileName = req.body.fileName;
  const filePath = path.join(process.cwd(), "static", fileName);
  // 加上"utf-8"会将buffer传为string
  const stream = fs.readFileSync(filePath);
  // 两个响应头
  // Content-Type application/octet-stream表示二进制流
  // 常见的还有application/json application/pdf
   res.setHeader("Content-Type", "application/octet-stream");
   // Content-Disposition: inline 默认，表示在页面内显示，比如在网页打开图片
   // Content-Disposition: attachment表示下载
   res.setHeader("Content-Disposition", "attachment; filename="+ fileName);
   res.send(stream)
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
