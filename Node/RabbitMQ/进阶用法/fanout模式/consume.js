import amqplib from "amqplib";

//1.连接MQ
const connection = await amqplib.connect("amqp://localhost:5672");
//2.创建一个通道
const channel = await connection.createChannel();
// 3.创建交换机
// 这个方法创建交换机，不会重复创建
await channel.assertExchange("fanout-1", "fanout", {
  durable: true,
});
// 4.创建队列
const { queue } = await channel.assertQueue("queue-1");

// 5.交换机跟队列需要绑定
/**
 * @param {string} queue 队列名称
 * @param {string} exchangeName 交换机名称
 * @param {string} routingKey 路由键，匹配路由的key
 */
channel.bindQueue(queue, "fanout-1", "");

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
