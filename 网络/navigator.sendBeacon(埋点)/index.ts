import express from "express";
import type { Request } from "express";
import cors from "cors";
import multer from "multer";
import getRawBody from "raw-body";

const app = express();
app.use(cors());
app.use(express.json());

// 使用中间件来解析 formData
// upload.none() 用于处理不包含文件上传的 formData 数据。
app.use(multer().none());

interface RequestBlob extends Request {
  rawBody?: Buffer | string;
}

// 只能接受post
app.post(
  "/beacon",
  (req, res, next) => {
    getRawBody(
      req,
      {
        length: req.headers["content-length"],
        limit: "1mb",
        encoding: req.headers["content-type"]?.includes("text") ? "utf-8" : null,
      },
      (err, string) => {
        if (err) return next(err);
        (req as RequestBlob).rawBody = string;
        next();
      }
    );
  },
  (req, res) => {
    const buffer = (req as RequestBlob).rawBody;
    const data = JSON.parse(buffer.toString());
    console.log(data.name); // 打印接收到的 Blob 数据
    res.send("Beacon data received");
  }
);

// 处理包含文件的 formData
const upload = multer({ dest: "uploads/" });

app.post("/uploadFile", upload.single("fileFieldName"), (req, res) => {
  console.log(req.body); // 打印 formData 数据
  console.log(req.file); // 打印上传的文件信息
  res.send("Form data with file received");
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
