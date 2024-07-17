import amqplib from "amqplib";
import express from "express";

const connection = await amqplib.connect("amqp://localhost:5672");
const channel = await connection.createChannel(); //创建一个频道
const queneName = "task_queue";

const app = express();

app.get("/send", async (req, res) => {
  const message = req.query.message;
  await channel.sendToQueue(queneName, Buffer.from(message), {
    persistent: true, //消息持久化，底层原理就是存磁盘上
  });

  res.send("ok！");
});

app.listen(3000, async () => {
  console.log("server started");
});
