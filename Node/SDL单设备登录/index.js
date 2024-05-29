import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// 初始化ws服务器
const wss = new WebSocketServer({ server });

const connection = {};

wss.on("connection", (ws) => {
  console.log("Client connected");
  // socket传输的数据只能是字符串或者buffer，前端传输的时候JSON.stringify
  // 需要传递{id:1,fingerprint:'123',action:'login'}
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.action === "login") {
      if (connection[data.id] && connection[data.id].fingerprint) {
        // 说明就是新设备登录
        connection[data.id].socket.send(
          JSON.stringify({ action: "logout", message: `您与${new Date().toLocaleDateString()}在其他设备登录` })
        );
        connection[data.id].socket.close()
        connection[data.id].socket = ws;
        console.log('新设备登录');
      } else {
        console.log('第一次登录')
        // 第一次登录，初始化数据结构
        connection[data.id] = {
          socket: ws, // 旧设备的socket
          fingerprint: data.fingerprint,
        };
      }
    }
  });
});
