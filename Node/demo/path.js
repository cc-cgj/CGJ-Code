const path = require("node:path");

// 1.basename() 返回给定路径的最后一部分 cgj.html
// console.log(path.basename("./foo/bar/index.html"));

// 我们现在时window系统，默认是F:\project\node
// window兼容正斜杠的写法
// posix标准处理不了反斜杠，window的路径
// console.log(path.posix.basename("\\foo\\bar\\index.html"));

// 比如你现在是Mac os,处理window的路径
// console.log(path.win32.basename("\\foo\\bar\\index.html"));

// 2.dirname() 返回路径的目录名 F:\project\node\foo\bar\index.html

// console.log(path.dirname("F:\\project\\node\\foo\\bar\\index.html"))

// 3.extname() 返回路径的文件后缀名

// 返回值是带点的
// console.log(path.extname("F:\\project\\node\\foo\\bar\\index.html"))

// 如果没有点，返回的是空值
// console.log(path.extname("./index"))

// 如果有多个点，返回最后一个
// console.log(path.extname("./index.aa.bb.cc.html"))

// 4.join()拼接路径
// console.log(path.join("./a", "./b", "./c", "../"));

// 5.resolve()返回的是绝对路径
// 都是绝对路径返回最后一个
// console.log(path.resolve('F:\\project\\node\\foo\\bar\\aa.html','F:\\project\\node\\foo\\bar\\bb.html'))
// 如果只有一个相对路径，则返回当前工作目录的绝对路径
// console.log(path.resolve('./aa.js'))
// 如果是一个绝对路径和一个相对路径，则返回拼接后的绝对路径
// console.log(path.resolve(__dirname, "a.js"));

// 6.parse() 解析路径，返回一个对象 path.format 逆向操作
// console.log(path.parse("/file/user/bar/file.txt"));

// 7.format() 解析一个parse格式对象，返回一个路径
console.log({
  root: "/",
  dir: "/file/user/bar",
  base: "file.txt",
  ext: ".txt",
  name: "file",
});

// 8.sep，根据操作系统返回不同的文件目录分隔符（window:\ mac: /）
console.log(path.sep);
