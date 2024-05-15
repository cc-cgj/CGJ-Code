import net from "net";

// 端口号是在TCP实现
const server = net.createServer((socket) => {
  setInterval(() => {
    socket.write("hello world");
  }, 1000);

  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

server.listen(3000, () => {
  console.log("server is listening on 3000");
});
