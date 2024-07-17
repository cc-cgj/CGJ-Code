import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app", //客户端标识
  brokers: ["localhost:9092"], // kafka集群地址
});

// 创建消费者
const consumer = kafka.consumer({ groupId: "test-group" });

// 连接服务器
await consumer.connect();
// 订阅主题
// fromBeginning: true 表示从主题的开始位置开始消费, 为 false 从最新的开始
await consumer.subscribe({ topic: "xiaojia", fromBeginning: true });


// 消费消息
consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic,
      partition,
      value: message.value.toString(),
    });
  },
});