import fastify from "fastify";
import proxy from "@fastify/http-proxy"; //负载代理技术
import rateLimit from "@fastify/rate-limit"; //限流技术
import caching from "@fastify/caching"; //缓存技术
import CircuitBreaker from "opossum"; //熔断技术
import proxyConfig from "./proxy/index.js";
import { rateLimitConfig, cachingConfig } from "./config/index.js";

const app = fastify({
  logger: false,
});

// 限流
app.register(rateLimit, rateLimitConfig);

// 熔断
// 第一个参数是回调函数要求返回promise
const breaker = new CircuitBreaker(
  (url) => {
    // 测试这个服务是否或者 9001 9002
    return fetch(url);
  },
  {
    timeout: 1000, // 超时时间
    errorThresholdPercentage: 50, // 错误率
    resetTimeout: 30000, // 熔断时间
  }
);

// 代理
proxyConfig.forEach((item) => {
  app.register(proxy, {
    preHandler: async (request, reply, done) => {
      breaker
        .fire(item.upstream)
        .then(() => {
          done();
        })
        .catch(() => {
          // 判断服务断了进行转发
          /**
           * ...
           */
          reply.send({
            code: 500,
            message: "服务器繁忙",
          });
        });
    },
    upstream: item.upstream,
    prefix: item.prefix,
    rewritePrefix: item.rewritePrefix,
    httpMethods: item.httpMethods,
  });
});

// 缓存
app.register(caching, cachingConfig);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at 3000`);
});
