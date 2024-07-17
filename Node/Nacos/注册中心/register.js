import Nacos from "nacos";
const client = new Nacos.NacosNamingClient({
  serverList: ["127.0.0.1:8848"], // 服务地址
  namespace: "public", // 命名空间
  logger: console, // 用于打印日志
});
await client.ready(); // 等待注册中心连接成功

const postServerName = "postServices";
client.registerInstance(postServerName, {
  ip: "127.0.0.1", // 服务实例IP
  port: 8080, // 服务实例端口
  weight: 1, // 服务实例权重
  enable: true, // 是否健康检查
  healthy: true, // 是否健康
  metadata: {
    "nacos.healthcheck.type": "HTTP", // 健康检查方式
    "nacos.healthcheck.url": "/health", // 健康检查地址
    "nacos.healthcheck.interval": 5, // 健康检查间隔时间
    "nacos.healthcheck.timeout": 3, // 健康检查超时时间
  },
});

const userServerName = "userServices";
client.registerInstance(userServerName, {
  ip: "127.0.0.1", // 服务实例IP
  port: 8081, // 服务实例端口
  weight: 1, // 服务实例权重
  enable: true, // 是否健康检查
  healthy: true, // 是否健康
  metadata: {
    "nacos.healthcheck.type": "HTTP", // 健康检查方式
    "nacos.healthcheck.url": "/health", // 健康检查地址
    "nacos.healthcheck.interval": 5, // 健康检查间隔时间
    "nacos.healthcheck.timeout": 3, // 健康检查超时时间
  },
});
