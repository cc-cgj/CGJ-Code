import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "node:fs";
import * as path from "node:path";
import puppeteer from "puppeteer";

const block = process.argv[2] || 1;

const baseUrl = "https://aiqicha.baidu.com/s";

const result = fs.readFileSync("./信用代码.txt");

const creditCodes = result.toString().replace(/\r/g, "").split("\n");

const browser = await puppeteer.launch({
  // 启动浏览器
  headless: false, // 默认是true，false代表显示浏览器
  // defaultViewport: {
  //   // 默认的窗口大小
  //   width: 1280,
  //   height: 800,
  // },
});

// 创建一个页面实例，用于所有后续查询
const page = await browser.newPage();

// 设置视口大小
await page.setViewport({ width: 1920, height: 1000 });

async function fetchPageContent(q = `91440203MA4UHE1W0H`, i) {
  // 3.跳转页面
  await page.goto(baseUrl + `?q=${q}`);

  // 4.为了代码健壮，等待元素出现再操作
  try {
    await page.waitForSelector(".company-list .wrap .card", { timeout: i === 0 ? 10000 : 5000 });
    // await page.waitForTimeout(1000);
    // 5.$获取单个元素，$$获取多个元素
    const element = await page.$(".company-list .wrap .card .info .title");
    const name = await (await (await element.$("a")).getProperty("innerText")).jsonValue();
    const tag = await (await (await element.$(".tag")).getProperty("innerText")).jsonValue();
    console.log(`${q}查询成功`);
    return {
      name,
      tag,
    };
  } catch (error) {
    if (error.name === "TimeoutError") {
      // 如果是超时错误，说明元素未出现
      console.log(`${q}查询失败`);
      return {
        name: "",
        tag: "",
      };
    } else {
      // 处理其他类型的错误
      throw error;
    }
  }
}

console.log("开始查询");
// creditCodes拆开，由五个数组组成

const a = creditCodes.length / 5;
const b = Math.ceil(a * block);

let startIndex = 0;
let endIndex = b;
if (block > 1) {
  startIndex = a * (block - 1);
  endIndex += startIndex;
}

let x = 0;

const creditCodesChunk = creditCodes.slice(startIndex, endIndex);

const firms = [];

for (let i = 0; i < creditCodesChunk.length; i++) {
  const code = creditCodesChunk[i];
  const result = await fetchPageContent(code, i);
  firms.push({ code, ...result });
}
fs.writeFileSync(
  `./data_${block}.json`,
  JSON.stringify({
    data: firms,
  })
);

console.log(`${key}.json生成成功！`);

console.log("查询结束");
