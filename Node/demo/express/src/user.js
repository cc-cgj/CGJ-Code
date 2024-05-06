import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.json({
    code: 200,
    data: "登录成功",
  });
});

router.post("/register", (req, res) => {
  res.json({
    code: 200,
    data: "注册成功",
  });
});

export default router;
