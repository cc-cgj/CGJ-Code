const zlib = require("node:zlib");
const fs = require("node:fs");
const http = require("node:http");

// 一、gzip适用于
// 压缩
// const readStream = fs.createReadStream('index.txt')
// const writeStream = fs.createWriteStream('index.txt.gz')
// readStream.pipe(zlib.createGzip()).pipe(writeStream)

// 解压缩
// const readStreamGz = fs.createReadStream("index.txt.gz");
// const writeStreamGunzip = fs.createWriteStream("indexGunzip.txt");
// readStreamGz.pipe(zlib.createGunzip()).pipe(writeStreamGunzip);

// 二、deflate适用于网络传输和 HTTP 响应的内容编码

// const readStream = fs.createReadStream("index.txt");
// const writeStream = fs.createWriteStream("index.txt.deflate");
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);

// const readStreamDefalte = fs.createReadStream("index.txt.deflate");
// const writeStreamInfalte = fs.createWriteStream("indexInfalte.txt");
// readStreamDefalte.pipe(zlib.createInflate()).pipe(writeStreamInfalte);

// 三、http
// 6.2kb, gzip: 239 B, deflate: 230 B
const server = http.createServer((req, res) => {
  const txt = "小甲".repeat(1000);
  res.setHeader("Content-type", "text/plan;charset=utf-8");
  res.setHeader("Content-encoding", "gzip");
  const result = zlib.gzipSync(txt);
  // res.setHeader("Content-encoding", "deflate");
  // const result = zlib.deflateSync(txt);
  res.end(result);
});

server.listen(3000, () => {
  console.log("服务已启动");
}); // 小于65535

/** @gzip和deflate压缩的区别 */
// 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
// 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
// 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
// 应用场景：gzip适用于文件压缩,无损，而deflate适用于http相应的内容编码
