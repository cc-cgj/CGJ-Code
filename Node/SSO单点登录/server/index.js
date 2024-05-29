import express from "express"; //启动服务编写接口
import session from "express-session"; //操作前端的cookie
import jsonwebtoken from "jsonwebtoken"; //生成token
import cors from "cors"; //cors 跨域
import fs from "node:fs";

// 真正工作中是用后台管理系统去管理
const appToMapUrl = {
  //vue3应用appId
  Rs6s2aHi: {
    url: "http://localhost:5173", //对应的应用地址
    secretKey: "%Y&*VGHJKLsjkas", //对应的secretKey
    token: "", //token
  },
  //react应用appId
  "9LQ8Y3mB": {
    url: "http://localhost:5174", //对应的应用地址
    secretKey: "%Y&*FRTYGUHJIOKL", //对应的secretKey
    token: "", //token
  },
};

const app = express();
app.use(express.json());
app.use(cors()); //解决一下跨域
// 帮我们操作cookie,这注册完这个中间件之后就能用session
app.use(
  session({
    secret: "assdadsa%^(*",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //过期时间
    },
  })
);

// 目前设计的比较简单只有appId, 当然你的系统需要别的东西也可以放进去
const generateToken = (appId) => {
  // 第一个参数就是载荷 就是我们存的信息
  // 正常业务这个东西是存在redis里面,redis设置过期时间
  const token = jsonwebtoken.sign({ appId }, appToMapUrl[appId].secretKey, {
    // expiresIn: "1h", //token过期时间
  });
  return token;
};

// 一进页面就要调一下登录接口
// 1.登录过,直接返回token
// 2.没登陆过跳转登录页面
app.get("/login", (req, res) => {
  const appId = req.query.appId;
  if (req.session.username) {
    // 表示已经登录过了
    let token;
    if (appToMapUrl[appId].token) {
      // 第一个应用
      token = appToMapUrl[appId].token;
    } else {
      // 以后的应用会走这儿
      token = generateToken(appId);
      appToMapUrl[appId].token = token;
    }
    res.redirect(`${appToMapUrl[appId].url}?token=${token}`);
    return;
  }
  const html = fs.readFileSync("../sso.html", "utf-8");
  res.send(html);
});

app.get("/protected", (req, res) => {
  const { username, password, appId } = req.query;
  // 这儿需要判断账号密码对不对
  // 生成token
  const token = generateToken(appId);
  req.session.username = username; // 存一个标识证明登录过了
  appToMapUrl[appId].token = token; // 给这个对象存一份token
  const url = appToMapUrl[appId].url;
  res.redirect(`${url}?token=${token}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
