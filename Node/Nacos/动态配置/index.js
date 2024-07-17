import express from "express";
import Nacos from "nacos";

const client = new Nacos.NacosConfigClient({
  serverAddr: "127.0.0.1:8848",
});

const enums = {
  type: 2,
};

const app = express();

// 监听配置项变化
client.subscribe(
  {
    dataId: "type",
    group: "DEFAULT_GROUP",
  },
  (data) => {
    console.log("配置变化", data);
  }
);

// 存储配置项
// await client.publishSingle("type2", "DEFAULT_GROUP", "007");
// 删除配置项
// await client.remove("type2", "DEFAULT_GROUP");

app.get("/", async (req, res) => {
  // 获取配置
  let content = await client.getConfig("type", "DEFAULT_GROUP");
  res.json({
    content: JSON.parse(content),
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
