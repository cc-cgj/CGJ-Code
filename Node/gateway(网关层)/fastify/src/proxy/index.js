export default [
  {
    upstream: "http://localhost:9001", //负载代理地址
    prefix: "/pc",
    rewritePrefix: "",
    httpMethods: ["GET", "POST"],
  },
  {
    upstream: "http://localhost:9002", //负载代理地址
    prefix: "/mobile",
    rewritePrefix: "",
    httpMethods: ["GET", "POST"],
  },
];
