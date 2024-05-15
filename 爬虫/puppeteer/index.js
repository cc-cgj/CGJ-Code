import puppeteer from "puppeteer";
import { spawn } from "child_process";

const te = process.argv[2];
// puppeteer 每个操作都是异步的，需要加await
// 1.创建一个浏览器
// 高版本的node支持顶级await
const browser = await puppeteer.launch({
  // 启动浏览器
  headless: false, // 默认是true，false代表显示浏览器
  // defaultViewport: {
  //   // 默认的窗口大小
  //   width: 1280,
  //   height: 800,
  // },
});
// 2.搞个页面
const page = await browser.newPage();

// 3.跳转页面
await page.setViewport({ width: 1920, height: 1000 });
await page.goto("https://www.juejin.cn");

// 4.为了代码健壮，等待元素出现再操作
await page.waitForSelector(".side-navigator-wrap");

// 5.$获取单个元素，$$获取多个元素
const elements = await page.$$(".side-navigator-wrap .nav-item-wrap span");

const collectFn = async () => {
  const titleList = [];
  await page.waitForSelector(".entry-list");
  const elements = await page.$$(".entry-list .title-row a");
  for await (const el of elements) {
    const prop = await el.getProperty("innerText");
    const text = await prop.jsonValue();
    titleList.push(text);
  }
  const pyProcess = spawn("python", ["index.py", titleList.join(",")]);
  
  pyProcess.stdout.on("data", (data) => {
    console.log("python执行完成", data.toString());
  });
  pyProcess.stderr.on("data", (data) => {
    console.log("python执行错误", data.toString());
  });
  pyProcess.on("close", (code) => {
    console.log("python执行完闭", code);
  });
};

for await (const el of elements) {
  const prop = await el.getProperty("innerText");
  const text = await prop.jsonValue();
  if (text === (te || "前端")) {
    await el.click();
    await collectFn();
    break;
  }
}
