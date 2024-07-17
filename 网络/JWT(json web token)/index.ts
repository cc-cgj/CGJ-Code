import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let Key = "123456";

let user = {
  name: "admin",
  password: "123456",
  id: "1",
};

// 1.登录返回前端token，用于授权
app.post("/api/login", (req, res) => {
  if (req.body.name === user.name && req.body.password === user.password) {
    res.json({
      message: "登陆成功",
      token: jwt.sign({ id: user.id }, Key, {
        expiresIn: "1h",
      }),
    });
  } else {
    res.status(403).json({
      message: "用户名或密码错误",
    });
  }
});

// 2.列表接口但是必须是授权状态才能访问 否则403
app.get("/api/list", (req, res) => {
  // authorization是w3c标准
  let token = req.headers.authorization as string; // 前端会把token存放在这个请求头里面
  jwt.verify(token, Key, (err, decode) => {
    if (err) {
      // token 没有权限根据规范返回403
      res.status(403).json({
        message: "无权限",
      });
    } else {
      res.json({
        list: [
          { id: 1, name: "张三" },
          { id: 2, name: "李四" },
          { id: 3, name: "王五" },
        ],
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
