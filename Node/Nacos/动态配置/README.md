### 什么是动态配置？

在 Nacos 中，动态配置是指可以在运行时动态修改应用程序的配置信息，而不需要重新启动或重新部署应用程序。通过 Nacos 的动态配置功能，开发人员可以将应用程序的配置信息存储在 Nacos 服务器中，并在需要时进行修改和更新。这样，即使应用程序已经在运行，也可以通过修改 Nacos 中的配置信息来实现配置的更新，从而避免了重新部署的麻烦

比如我们的服务部署到三个服务器，需要连接数据库，那如果数据库的账号密码或者其他配置项发生变化，我们需要修改配置项，然后重启服务，并且还要重启三次太麻烦了，所以就有了动态配置，这些配置项存储到 nacos 里面，修改 nacos 的配置信息来实现动态更新配置项。

### 案例演示

# 1. 增删改查 配置项 可视化版本

![alt text](<images/增删改查 配置项 可视化版本.png>)

1. Data ID 就是一个 key

2. Group 分组

3. 配置格式 就是你要存储的数据格式

4. 配置内容 存储的数据

![alt text](<images/增删改查 配置项 可视化版本2.png>)

# 2. 增删改查 配置项 代码版本

1. publishSingle 新增配置项
2. remove 删除配置项
3. getConfig 读取配置项
4. subscribe 监听配置项变化

```js
import express from "express";
import { NacosConfigClient } from "nacos";
const app = express();
const client = new NacosConfigClient({
  serverAddr: "127.0.0.1:8848",
});
//新增一个配置项
//const content = await client.publishSingle('config', 'DEFAULT_GROUP', '{"host":"127.0.0.1","port":8848}')
//删除一个配置项
//await client.remove('config', 'DEFAULT_GROUP')
//查询一个配置项
//const config = await client.getConfig('config', 'DEFAULT_GROUP')
//监听配置变化
// client.subscribe({ dataId: 'config', group: 'DEFAULT_GROUP', },
//     content => {
//         console.log(content)
//     }
// )

app.get("/", async (req, res) => {
  res.json({
    code: 200,
    content: JSON.parse(config),
  });
});

app.listen(3000, () => {
  console.log("3000Server");
});
```
