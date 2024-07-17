import amqplib from "amqplib";
import express from "express";

//1.连接MQ
const connection = await amqplib.connect("amqp://localhost:5672");
//2.创建一个通道
const channel = await connection.createChannel();
//3.创建交换机
/**
 * @param {string} exchangeName 交换机名称 随便写
 * @param {string} type 交换机类型 direct fanout topic headers
 * @param {object} options = { durable:是否持久化 } 可选
 */
// 这个方法创建交换机，不会重复创建
await channel.assertExchange("direct-1", "direct", {
  durable: true,
});

// 4. 发送消息

/**
 * @param {string} exchangeName 要发送交换机名称
 * @param {string} routingKey 路由键，匹配路由的key
 * @param {Buffer} buffer 要发送的二进制消息
 */

channel.publish("direct-1", "direct-1-key", Buffer.from("direct消息发送了"));

// 断开连接
await channel.close();
await connection.close();
console.log("生产者producer消息发送成功");
process.exit(0);
