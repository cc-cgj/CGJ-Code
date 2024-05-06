// 全局的，不需要引入

// 1、platform，获取操作系统名
// 2、arch，cpu位数(32、64位)
// console.log(process.platform);
// console.log(process.arch);

// 3、argv 获取执行命令的参数 node xx.js --version
console.log(process.argv)

// 4、cwd() 获取工作目录，__dirname在esm模式下执行不了，可以用cwd代替
// console.log(process.cwd());

// 5、memoryUsage()内存信息
// console.log(process.memoryUsage())
// {
//   rss: 30613504, // 常驻集大小，就是物理内存的存量
//   heapTotal: 6475776, // V8引擎给我们分配的堆内存的总大小包括未使用的内存
//   heapUsed: 5720632, // 已经使用的内存
//   external: 427424, // 外部的内存 C、C++ 使用的
//   arrayBuffers: 17678 // 二进制的总量
// }

// 6、exit()进程强制退出

// setTimeout(() => {
//   console.log("5000");
// }, 5000);

// setTimeout(() => {
//   process.exit();
// }, 1000);

// process.on("exit", () => {
//   console.log("强制退出进程");
// });

// 7、kill(),杀死进程 需要一个参数pid 进程id
// setTimeout(() => {
//   process.kill(process.pid);
// }, 1000);

// 8、env环境变量 获取操作系统所有的环境变量 可以修改 修改只在当前进程生效 不会真正影响系统的环境变量


// 只在当前进程生效，不会影响到系统的环境变量
process.env.JAVA_HOME = "cgj";
console.log(process.env);

// 插件cross-env
console.log(process.env.NODE_ENV == "development" ? "开发环境" : "生产环境");
// 原理：执行shell命令，window SET 环境变量；posix export 环境变量