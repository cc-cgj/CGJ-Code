import express from "express"; //提供服务
import multer from "multer"; //上传文件处理
import cors from "cors"; //解决跨域
import fs from "node:fs"; //文件操作
import path from "node:path"; //路径操作

// 1.初始化 multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 每个切片存储的目录
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // 文件名称
    cb(null, `${req.body.index}-${req.body.filename}`);
  },
});

const upload = multer({
  storage,
});

const app = express();
app.use(cors()); //支持跨域
app.use(express.json()); //支持POST json格式的请求体

// upload.single('file' // 前端传递的文件参数名)
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("upload success");
});

// 合并
app.post("/merge", (req, res) => {
  // 1.读取目录下面的所有切片
  const uploadDir = path.join(process.cwd(), "uploads");
  const dirs = fs.readdirSync(uploadDir);
  // 排序
  dirs.sort((a, b) => {
    return Number(a.split("-")[0]) - Number(b.split("-")[0]);
  });
  const video = path.join(process.cwd(), "video", `${req.body.filename}.mp4`);

  dirs.forEach((dir) => {
    // 生成video.mp4文件，并将切片文件追加进去
    fs.appendFileSync(video, fs.readFileSync(path.join(uploadDir, dir)));
    // 删除切片文件
    fs.unlinkSync(path.join(uploadDir, dir));
  });

  res.send({ code: 200, msg: "合并成功" });
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
