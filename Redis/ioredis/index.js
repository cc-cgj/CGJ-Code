import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

const redis2 = new Redis({
  host: "localhost",
  port: 6379,
});

// 发布订阅
redis.subscribe("channel");

redis.on("message", (channel, message) => {
  console.log(channel, message, "收到了");
});


redis2.publish("channel", "我是redis2");

// 字符串
// redis.set("name", "zhangsan");
// redis.get("name").then((result) => {
//   console.log(result);
// });

// 集合
// redis.sadd("set", 1, 1, 1, 2, 2, 3)

// redis.smembers("set").then((result) => {
//   console.log(result);
// });

// redis.srem("set", 1);

// redis.sismember("set", 2).then((result) => {
//   console.log(result);
// });

// 哈希
// redis.hset("hash", "name", "zhangsan");
// redis.hset("hash", "age", 18);
// redis.hdel("hash", "name");
// redis.hgetall("hash").then((result) => {
//   console.log(result);
// });

// 列表
// redis.lpush("list", 1, 2, 3);
// redis.rpush("list", 1, 2, 3);
// redis.llen("list").then((result) => {
//   console.log(result);
// });
// redis.lrange("list", 0, -1).then((result) => {
//   console.log(result);
// });

//
