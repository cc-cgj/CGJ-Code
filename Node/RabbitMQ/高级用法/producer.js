import amqplib from "amqplib";

// 1.连接MQ
const connection = await amqplib.connect("amqp://localhost:5672");
// 2.创建一个频道
const channel = await connection.createChannel();

// 3.创建一个交换机
await channel.assertExchange("delayed-1", "x-delayed-message", {
  arguments: {
    "x-delayed-type": "direct", //交换机的类型
  },
});

// 4.发送延迟消息
channel.publish("delayed-1", "key", Buffer.from("延迟消息"), {
  headers: {
    "x-delay": 1000 * 3, //延迟时间 3秒
  },
});

// 5.关系
await channel.close();
await connection.close();
process.exit(0);
