// 1.我们需要知道操作系统有多少个核心
import os from "node:os";
import cluster from "node:cluster";
import http from "node:http";

const cpusNum = os.cpus().length;
// console.log(cpusNum); // 12

if (cluster.isPrimary) {
  // 主进程
  for (let i = 0; i < cpusNum; i++) {
    cluster.fork(); //创建十二个子进程
  }
} else {
  // 子进程
  // 执行12次，端口重复有端口复用技术防止报错
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("集群模块运行成功");
    })
    .listen(3000, () => {
      console.log("子进程启动成功");
    });
}
