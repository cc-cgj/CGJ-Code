import ws from "ws";

// 创建socket fw 3000 端口
const wss = new ws.Server({ port: 3000 }, () => {
  console.log("socket服务启动成功3000");
});

const state = {
  HEART: 1,
  MESSAGE: 2,
};

// 监听客户端的连接
wss.on("connection", (socket) => {
  // 监听客户端的消息
  console.log("客户端连接成功");
  socket.on("message", (data) => {
    console.log("客户端发来消息", data.toString());
    // 1. 单个消息
    // socket.send("我是服务端 发送给客户端的消息：" + data.toString());
    // 2. 广播消息
    // wss.clients 是 Set([client1,client2,client3,...])
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: state.MESSAGE,
          message: "我是服务端 发送给客户端的消息：" + data.toString(),
        })
      );
    });
  });

  // 3.socket 长时间不使用 网络波动 弱网模式 有可能会断开连接
  // 心跳检测 进行保活 保持连接
  let heartInterval = null;
  const heartCheck = () => {
    // 等于open 才会发送心跳
    if (socket.readyState === ws.OPEN) {
      socket.send(
        JSON.stringify({
          type: state.HEART,
          message: "心跳检测",
        })
      );
    } else {
      clearInterval(heartInterval);
    }
  };

  heartInterval = setInterval(heartCheck, 5000);
});
