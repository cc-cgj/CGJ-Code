import http from "node:http";

import { Server } from "socket.io";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 事件模型驱动
/**
 * {
 *  '房间号':[{name,room,id},...其他人]
 *  ...
 * }
 */
const groupMap = {};

io.on("connection", (socket) => {
  console.log("连接成功");

  // 1.加入房间 name名字, room 房间号
  // 2.组装一个格式，为什么？因为前端要渲染
  socket.on("join", (name, room) => {
    socket.join(room); //创建一个房间

    if (groupMap[room]) {
      // 已有房间
      groupMap[room].push({ name, room, id: socket.id });
    } else {
      // 没有就默认创建一个
      groupMap[room] = [{ name, room, id: socket.id }];
    }

    socket.emit("groupMap", groupMap); //浏览器为维度的
    socket.broadcast.emit("groupMap", groupMap); // 推送给其他房间的人
    // 管理员发个消息
    // 弊端：A发送，BC可以收到，但是A不能收到
    socket.broadcast.to(room).emit("message", {
      name: "管理员",
      message: `欢迎${name}进入聊天室`,
    });

    //断开链接内置事件
    socket.on("disconnect", () => {
      Object.keys(groupMap).forEach((key) => {
        let leval = groupMap[key].find((item) => item.id === socket.id);
        if (leval) {
          socket.broadcast
            .to(leval.room)
            .emit("message", { name: "管理员", message: `${leval.name}离开了房间` });
        }
        groupMap[key] = groupMap[key].filter((item) => item.id !== socket.id);
      });
      socket.broadcast.emit("groupMap", groupMap);
    });
  });

  // 接收消息
  socket.on("message", ({ name, message, room }) => {
    socket.broadcast.to(room).emit("message", { name, message });
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
