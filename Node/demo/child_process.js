const {
  exec,
  execSync,
  spawn,
  spawnSync,
  execFile,
  fork,
} = require("node:child_process");
const path = require("node:path");

// 1、exec() 异步的方法 回调函数 返回buffer 可以帮助我们执行shell命令后者跟软件交互
// 2、execSync 同步的方法
// 3、执行较小的shell命令，想要立马拿到结果的shell，exec、execSync字节上线200kb

// exec("node -v", (err, stdout, stderr) => {
//   if (err) {
//     return err;
//   }
//   // 默认情况下，Node.js 会将输出解码为 UTF-8 并将字符串传给回调
//   console.log(stdout);
// });

// execSync默认返回值: 'buffer'
// const nodeVersonBuffer = execSync("node -v");
// console.log(nodeVersonBuffer.toString());

// execSync('mkdir test')
// execSync('start chrome http://www.baidu.com')
// execSync('start D:\\QQMusic\\QQMusic.exe')

// 4、spawn 没有字节上线，返回是流，实时返回
// 5、spawnSync

// const a = execSync('netstat')
// console.log(a);

// const { stdout } = spawn("netstat", ["params1", "params2"], {});

// stdout.on("data", (msg) => {
//   // Buffer
//   console.log(msg.toString());
// });

// stdout.on("close", () => {
//   console.log("结束了");
// });

// 6、execFile 执行可执行文件
// execFile(path.resolve(__dirname, "./bat.cmd"), null, (err, stdout, stderr) => {
//   console.log(`执行成功: xxxxx${stdout}`);
// });

// 底层实现顺序
// exec -> execFile -> spawn

// 7、fork() 创建子进程，只接受.js
// Node 不适合做CPU密集型应用，可以将耗时的代码放在子进程，防止影响主进程
// 底层：IPC通讯，IPC基于libuv （window使用named pipe）（posix(mac | linux) unix doman socket）

const forkProcess = fork("./forkProcess.js");

forkProcess.send("我是主进程");

forkProcess.on("message", (msg) => {
  console.log(`主进程收到消息了：`, msg);
});
