"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const raw_body_1 = __importDefault(require("raw-body"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
// 使用中间件来解析 formData
// upload.none() 用于处理不包含文件上传的 formData 数据。
app.use(multer_1.default().none());
// 只能接受post
app.post("/beacon", (req, res, next) => {
    var _a;
    raw_body_1.default(req, {
        length: req.headers["content-length"],
        limit: "1mb",
        encoding: ((_a = req.headers["content-type"]) === null || _a === void 0 ? void 0 : _a.includes("text")) ? "utf-8" : null,
    }, (err, string) => {
        if (err)
            return next(err);
        req.rawBody = string;
        next();
    });
}, (req, res) => {
    const buffer = req.rawBody;
    const data = JSON.parse(buffer.toString());
    console.log(data.name); // 打印接收到的 Blob 数据
    res.send("Beacon data received");
});
// 处理包含文件的 formData
const upload = multer_1.default({ dest: "uploads/" });
app.post("/uploadFile", upload.single("fileFieldName"), (req, res) => {
    console.log(req.body); // 打印 formData 数据
    console.log(req.file); // 打印上传的文件信息
    res.send("Form data with file received");
});
app.listen(3333, () => {
    console.log("Server is running on port 3333");
});
