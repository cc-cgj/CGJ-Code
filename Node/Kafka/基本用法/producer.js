import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app", //客户端标识
  brokers: ["localhost:9092"], // kafka集群地址
});

// 创建生产者
const producer = kafka.producer();

// 连接服务器
await producer.connect();

// 发送消息
await producer.send({
  topic: "xiaojia",
  messages: [
    { value: "Hello KafkaJS user!" },
    { key: "some-key", value: "some-value" },
    { value: Buffer.from("测试Buffer数据") },
  ],
});

// 关闭Kafka连接
await producer.disconnect();
