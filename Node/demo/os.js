const os = require("node:os");
const { exec } = require("child_process");

// 1、platform() 获取操作系统平台 win32
// console.log(os.platform());

// 2、release() 返回操作系统版本
// console.log(os.release())

// 3、type() 返回的操作系统名称。 例如，它在 Linux 上返回 'Linux'，在 macOS 上返回 'Darwin'，在 Windows 上返回 'Windows_NT'
// console.log(os.type());

// 4、version() 返回操作系统的版本号
// console.log(os.version());

// 5、vite、webpack --open原理：
// 判断不同系统，调用shell命令
const open = (url) => {
  const platform = os.platform();
  switch (platform) {
    // mac
    case "darwin":
      exec(`open ${url}`);
      break;
    // window
    case "win32":
      exec(`start ${url}`);
      break;
    case "linux":
      exec(`xdg-open ${url}`);
      break;
  }
};

// open("https://www.baidu.com");

// 6、homedir()读取用户的目录
// shell命令，window: echo %userprofile%;mac $HOME
// console.log(os.homedir());

// 7、arch()获取CPU架构, x64
// console.log(os.arch());

// 8、cpus()获取操作系统的线程，CPU的信息
// console.log(os.cpus());
// {
//   model: 'AMD Ryzen 5 5500U with Radeon Graphics',
//   speed: 2096, //CPU运行速度
//   times: { //ms
//   user: 107703, //用户所使用的时间
//   nice: 0, // 优先级较低的程序使用时间
//   sys: 123312, //系统内核使用时间
//   idle: 23955937, //空闲时间
//   irq: 8093 //硬件被中断的时间
// }
// }

// 9、获取线程的长度，逻辑处理器的数量
// console.log(os.cpus().length);

// 10、networkInterfaces()网络信息
console.log(os.networkInterfaces());

// {
//   address: 'fe80::31a4:ea09:adf8:9fc7', //IP地址
//   netmask: 'ffff:ffff:ffff:ffff::',// 子网掩码
//   family: 'IPv6', // IP版本 IPV4,IPV6
//   mac: '00:45:e2:fe:ff:61', // 网卡的mac地址
//   internal: false,// 标识是不是内网
//   cidr: 'fe80::31a4:ea09:adf8:9fc7/64', // ip地址段
// }
