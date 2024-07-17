import { Kafka, CompressionTypes } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer.connect();

// await producer.send({
//   topic: "test-topic",
//   // 1. 压缩 CompressionTypes gzip snappy lz4 zstd
//   compression: CompressionTypes.GZIP,
//   messages: [
//     {
//       value: "Hello KafkaJS user!",

//       // 2. 标头 headers 传递元数据
//       headers: { name: "小甲" },
//     },
//   ],
// });

// 3. 一对多 topicMessages eachBatch

await producer.sendBatch({
  topicMessages: [
    {
      topic: "test-topic",
      messages: [
        {
          value: "test-topic",
          headers: { name: "小甲" },
        },
      ],
    },
    {
      topic: "test-topic2",
      messages: [
        {
          value: "test-topic2",
          headers: { name: "小甲2" },
        },
      ],
    },
  ],
});

await producer.disconnect();
process.exit(0);
