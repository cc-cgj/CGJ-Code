import amqplib from "amqplib";

const connection = await amqplib.connect("amqp://localhost:5672");
const channel = await connection.createChannel(); //创建一个频道
const queneName = "task_queue";

// 连接频道
await channel.assertQueue(queneName, {
  durable: true //队列和交换机的持久化
});

channel.consume(queneName, (msg) => {
  console.log(msg.content.toString());
  channel.ack(msg); //确认消息被确认
});
