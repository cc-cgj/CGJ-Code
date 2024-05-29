import NodeClam from "clamscan";

const clam = new NodeClam().init({
  scan_recursively: true, //深度扫毒
  clamdscan: {
    scanArchives: true, // 扫描压缩文件 zip
  },
  // 配置引擎
  clamdscan: {
    port: 3310,
    host: "127.0.0.1",
  },
});

clam.then((clamEng) => {
  // 扫描目录 windows用不了 linux可以用
  clamEng.scanDir("c:/Users/data-show.ico").then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  // 检查这个文件是不是病毒，返回true/false
  clamEng.isInfected("c:/Users/data-show.ico").then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  // 扫描单个文件
  clamEng.scanFile("c:/Users/data-show.ico").then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  // 扫描文件流
  clamEng.scanStream(fs.createReadStream("c:/Users/data-show.ico")).then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  // 扫描多个文件
  clamEng.scanFiles(["./index.js", "./package.json"]).then((err, goodFiles, badFiles) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`没有问题的文件`, goodFiles);
      console.log(`有问题的文件`, badFiles);
    }
  });
});
