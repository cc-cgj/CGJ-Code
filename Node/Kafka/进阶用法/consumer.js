import { Kafka, CompressionTypes } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
await consumer.connect();
await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
await consumer.subscribe({ topic: "test-topic2", fromBeginning: true });
consumer.run({
  // 它是逐条消费
  eachMessage: ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
      headers: message.headers.name.toString(),
      // 2. 解压缩
      // compression: message.compression,
    });
  },
  // 批量消费消息
  eachBatch: async ({ batch, resolve, reject }) => {
    batch.messages.forEach(async (message) => {
      console.log({
        value: message.value.toString(),
        headers: message.headers.name.toString(),
      });
    });
  },
});
