import amqplib from "amqplib";

// 1.连接MQ
const connection = await amqplib.connect("amqp://localhost:5672");
// 2.创建一个频道
const channel = await connection.createChannel();

// 3.创建一个交换机,不会重复创建
await channel.assertExchange("delayed-1", "x-delayed-message", {
  arguments: {
    "x-delayed-type": "direct", //交换机的类型
  },
});

// 4.创建一个队列
await channel.assertQueue("queue-1");

// 5.绑定队列
channel.bindQueue("queue-1", "delayed-1", "key");

// 6.消费/监听消息
channel.consume(
  "queue-1",
  (msg) => {
    console.log(msg.content.toString());
  },
  {
    noAsk: true, //自动消息确认
  }
);
