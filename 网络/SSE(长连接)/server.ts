import exress from "express";
import cors from "cors";
import fs from "node:fs";

const app = exress();
app.use(cors());
app.use(exress.json());

app.get("/api/see", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream", //设置请求头
  });

  const txt = fs.readFileSync("./index.txt", "utf8");

  const arr = txt.split("");
  let current = 0;
  let timer = setInterval(() => {
    if (current < arr.length) {
      res.write("event: lol\n");
      res.write(`data: ${arr[current]}\n\n`);
      current++;
    } else {
      res.write("event: close\n");
      res.write(`data: \n\n`); //固定格式，必须要抛出`data: \n\n`，否则客户端会接收不到close事件
      clearInterval(timer);
    }
  }, 100);
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
