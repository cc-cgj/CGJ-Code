const whiteList = ["localhost"];

const PreventHotLinking = (req, res, next) => {
  // 如何获取referer,如果是直接打开的资源是获取不到的,如 http://xxx/xx.png
  const referer = req.get("referer");
  console.log(`referer`, referer);
  // 前端不能伪造,后端可以伪造
  if (referer) {
    const { hostname } = new URL(referer);
    if (!whiteList.includes(hostname)) {
      res.status(403).send("禁止访问");
      return;
    }
  }
  next();
};

export default PreventHotLinking;
