import amqplib from "amqplib";

//1.连接MQ
const connection = await amqplib.connect("amqp://localhost:5672");
//2.创建一个通道
const channel = await connection.createChannel();
// 3.创建交换机
await channel.assertExchange("direct-1", "direct");
// 4.创建队列
const { queue } = await channel.assertQueue("direct-1-queue");

// 5.交换机跟队列需要绑定
/**
 * @param {string} queue 队列名称
 * @param {string} exchangeName 交换机名称
 * @param {string} routingKey 路由键，匹配路由的key
 */
channel.bindQueue(queue, "direct-1", "direct-1-key");

// 6.消费消息
channel.consume(
  queue,
  (msg) => {
    console.log(msg.content.toString());
  },
  {
    noAck: true, // 自动消息确认： channel.ack(msg); //确认消息被确认
  }
);
