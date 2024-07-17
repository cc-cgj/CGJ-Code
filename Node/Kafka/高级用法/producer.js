import { Kafka } from "kafkajs";

// 1. 集群管理
// 2. 客户端消息管理
// 3. 事务管理

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9093"],
});

// 创建一个客户端
const admin = await kafka.admin();
await admin.connect();

// 查看集群的信息
// const cluster = await admin.describeCluster();
// console.log(cluster);

/** 管理主题 topic */

// 删除主题
// await admin.deleteTopics({
//   topics: ["test-topic"],
// });

// 新增主题
// await admin.createTopics({
//   topics: [
//     {
//       topic: "test-topic",
//       numPartitions: 2,
//       replicationFactor: 1,
//     },
//   ],
// });

// 查看所有创建的主题，包括之前创建的主题
// const topic = await admin.listTopics();
// console.log(topic);

/** 事务管理 */
// 转钱：A-B A-100 B+100
const producer = kafka.producer({
  // 事务id
  transactionalId: "my-transactional-id",
  maxInFlightRequests: 1, //最大同时发送的消息数
  // 是否是幂等数
  idempotent: true,
});

// 创建事务
const transaction = await producer.transaction();
try {
  await transaction.send({
    topic: "AAA",
    messages: [
      {
        key: "A",
        value: "A-100",
      },
    ],
  });
  await transaction.send({
    topic: "BBB",
    messages: [
      {
        key: "B",
        value: "B+100",
      },
    ],
  });
  // 提交
  await transaction.commit();
} catch (e) {
  // 回滚
  await transaction.abort();
}
