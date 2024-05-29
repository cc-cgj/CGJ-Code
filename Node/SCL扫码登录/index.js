import express from "express";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";

// mandate.html 授权页面
// qrcode.html 展示我们的二维码以及状态的一个页面

const app = express();
const user = {};
const userId = 1;

app.use("/static", express.static("public")); //静态目录

// 1.生成二维码，并且初始化数据结构
app.get("/qrcode", async (req, res) => {
  user[userId] = {
    token: null, //登录凭证 默认为空
    time: Date.now(), // 过期时间到时候拿来判断
  };
  // 生成二维码
  const code = await qrcode.toDataURL(
    `http://192.168.2.42:3000/static/mandate.html?userId=${userId}`
  ); //授权页面
  res.json({
    code, //返回二维码
    userId, //返回用户ID
  });
});

// 2.登录授权 返回token 更改状态 为 1-已授权
app.post("/login/:userId", (req, res) => {
  const id = req.params.userId;
  const token = jwt.sign({ id }, "secret");

  user[id].token = token;
  user[id].time = Date.now();
  res.json({
    token,
  });
});

// 3.检查二维码的状态 0-默认值 1-已授权 2-已过期
app.get("/check/:userId", (req, res) => {
  const id = req.params.userId;
  if (Date.now() - user[id].time > 1000 * 60 * 1) {
    res.json({
      status: 2, // 超时了返回状态2
    });
  } else if (user[id].token) {
    res.json({
      status: 1, //已授权
    });
  } else {
    res.json({
      status: 0, //未授权
    });
  }
});

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
