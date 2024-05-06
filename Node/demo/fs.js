const fs = require("node:fs");
const fsPromise = require("node:fs/promises");

// 1、readFile 读取文件 flag

// 异步
// fs.readFile(
//   "./fs.txt",
//   {
//     encoding: "utf-8",
//     flag: "r", //'r': 打开文件进行读取。 如果文件不存在，则会发生异常。
//   },
//   (err, data) => {
//     if (err) {
//      throw err
//     }
//     console.log(data);
//   }
// );

// 同步
// 如果指定了 encoding 选项，则此函数返回字符串。 否则它返回值为一个buffer
// const fileBuffer = fs.readFileSync("./fs.txt");
// console.log(fileBuffer.toString());

// promise
// fsPromise.readFile("./fs.txt").then((res) => {
//   console.log(res.toString('utf-8'));
// });

// 2、可读流 createReadStream
// 处理大文件的

// const readStream = fs.createReadStream("./fs.txt");
// readStream.on("data", (chunk) => {
//   console.log(chunk.toString("utf-8"));
// });

// readStream.on("close", () => {
//   console.log("文件读取完成");
// });

// 3、创建文件夹mkdir，使用recursive选项递归创建
// fs.mkdirSync("./test/test.js", {
//   recursive: true,
// });

// 4、删除文件rm
// fs.rm(
//   "./test",
//   {
//     recursive: true,
//   },
//   () => {
//     console.log("文件已删除");
//   }
// );

// 5、重命名 renameSync
// fs.renameSync("./test/test.js", "./test/index.js");

// 6、监听文件变化 watch
// fs.watch("./fs.txt", (event, filename) => {
//   console.log(event, filename);
// });

/** @link https://github.com/libuv/libuv */
// 7、源码libuv（底层为C、C++等）
// fs的源码是通过 C++ 层的 FSReqCallback 这个类 对libuv 的uv_fs_t 的一个封装，其实也就是将我们fs 的参数透传给 libuv 层

// 8、注意事项：V8引擎事件循环，IO流是由libuv， setImmediate是由V8引擎控制

// fs异步， IO操作由libuv完成之后，才会推入到V8引擎的事件队列
// fs.readFile(
//   "./fs.txt",
//   {
//     encoding: "utf-8",
//     flag: "r",
//   },
//   (err, stdout) => {
//     if (err) {
//       throw err;
//     }
//     console.log("stdout");
//   }
// );

// setImmediate(() => {
//   console.log("setImmeadiate");
// });

// setTimeout(() => {
//   console.log("setTimeout");
// });

// 9、写入文件
// fs.writeFileSync("./fs.txt", "JAVA之父 XXX");

// fs.writeFileSync("./fs.txt", "\n阿斯顿", {
//   flag: "a", //append 如果文件不存在，则创建该文件
// });

// 10、追加写入文件 两种方式
// fs.appendFileSync('./fs.txt','\n嘻嘻哈哈')

// 11、创建可写流
// const writeStream = fs.createWriteStream("./fs.txt");

// const verse = [
//   "带到秋来九月八",
//   "我花开后百花杀",
//   "冲天香阵透长安",
//   "满城尽带黄金甲",
// ];

// verse.forEach((text) => {
//   writeStream.write(text + "\n");
// });

// writeStream.end();

// writeStream.on("finish", () => {
//   console.log("写入完成");
// });

// 12、创建软连接（window的快捷方式）、硬链接（两个文件共享同一内存地址）、pnpm 底层原理
// fs.linkSync("./fs.txt", "./fsLink.txt");
fs.symlinkSync("./fs", "./fsSymlink", "file");
