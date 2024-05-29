import OpenAI from "openai";
import dotEnv from "dotenv";
import express from "express";

dotEnv.config(); // 他会把.env 文件中的环境变量加载到process.env

console.log(process.env)
console.log(process.env["OPENAI_API_KEY"])

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  // 如果你是代理的key需要写代理地址，openai官网则不用
  baseURL: "https://openkey.cloud/v1",
});

// 1.问答
app.post("/chat", async (req, res) => {
  const { messages } = req.body; // 提问的消息
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    // 为什么是个数组？可以联系上下文
    messages: [
      {
        role: "user",
        content: messages,
      },
    ],
    // stream:true,// 打印机的效果
  });

  res.json({
    code: 200,
    data: completion.choices[0].message.content,
  });
});

// 2.图片生成
app.post("/create/image", async (req, res) => {
  const { message } = req.body;
  const image = await openai.images.generate({
    model: "dall-e-3",//模型
    n: 1, //生成图片数量
    size: "1024x1024", //图片大小
    prompt: message, //图片的描述
  });
  res.json({ code: 200, data: image.data[0].url });
});


app.listen(3000, () => {
  console.log("server is running");
});