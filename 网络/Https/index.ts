import https from "https";
import fs from "node:fs";

// http端口号为80 https端口号为443
https
  .createServer(
    {
      key: fs.readFileSync("./ssl/private-key.pem"),
      cert: fs.readFileSync("./ssl/certificate.pem"),
      // 密码短语
      passphrase: "123456",
    },
    (req, res) => {
      res.writeHead(200);
      res.end("hello world");
    }
  )
  .listen(443, () => {
    console.log("https://localhost:443");
  });
