import path from "node:path";
import http from "node:http";
import fs from "node:fs";
import { WebSocketServer } from "ws";
import screenshotDesktop from "screenshot-desktop";
import getPixels from "get-pixels";
import robot from 'robotjs'

// 1.创建一个服务 http 和 ws
const server = http.createServer();
const wss = new WebSocketServer({ server });

// 2.创建一个截图的函数
const createScreenShot = async () => {
  const image = await screenshotDesktop({
    format: "png",
  }); //截完屏幕返回的图像信息
  return {
    imageBuffer: image, //返回的二进制流信息
    base64: image.toString("base64"), // 返回base64 给前端去展示
  };
};

// 3.获取图像的宽高
const getScreenSize = async () => {
  const { imageBuffer, base64 } = await createScreenShot();
  const filePath = path.join(process.cwd(), "screenshot.png");
  fs.writeFileSync(filePath, imageBuffer);

  return new Promise((resolve, reject) => {
    getPixels(filePath, (err, pixels) => {
      if (err) {
        reject(err);
      } else {
        const width = pixels.shape[0];
        const height = pixels.shape[1];
        resolve({ width, height, base64 });
      }
    });
  });
};

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    if(data.type === 'click'){
      robot.moveMouse(data.x, data.y) //点击的屏幕位置
      robot.mouseClick() //点击
    }
  });
  setInterval(async () => {
    const data = await getScreenSize();
    ws.send(JSON.stringify(data));
  }, 500);
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
