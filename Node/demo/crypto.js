const crypto = require("node:crypto");

// 一、对点称加密算法
// 双方协商定义一个密钥以及iv
// 第一个参数： algorithm 接受一个算法，如：aes-256-cbc
// 第二个参数： key 也就是密钥 32位
// 第三个参数：iv 初始化向量 支持16位 保证我们生产的密钥串每次是不一样的 密钥串缺少位数 还可以进行补码

// const key = crypto.randomBytes(32);

// const iv = Buffer.from(crypto.randomBytes(16));

// const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// cipher.update("小甲cc", "utf-8", "hex");

// const result = cipher.final("hex");

// console.log(result);

// // 解密 相同的算法 相同的key  相同的iv
// const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

// decipher.update(result, "hex", "utf-8");

// const deresult = decipher.final("utf-8");

// console.log(deresult);

// 二、非对称加密算法
// 生成公钥和私钥
// 私钥只能是管理员拥有 不能对外公开
// 公钥可以对外公开

// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048, //长度越长越安全,但越慢
// });

// // 公钥加密
// const encrypted = crypto.publicEncrypt(publicKey, Buffer.from("小甲cc"));

// console.log(encrypted.toString("hex"));

// // 私钥解密
// const decrypted = crypto.privateDecrypt(privateKey, encrypted);

// console.log(decrypted.toString());

// 三、哈希函数
// 不能被解密 因为他是单向的 不可逆的
// 不是说很安全
// 具有唯一性
// md5 包裹一下存储到数据库 不可能明文存储的
// 撞库的方式去试你的密码
// 读取文件内容 转换成 md5 上传到服务端 后端拿到文件内容生成md5
// 跟前端md5匹配，如果一致，文件就没问题 如果不一致 文件有问题
// 校验文件的一致性
// const hash = crypto.createHash("sha256");
const hash = crypto.createHash("md5");

hash.update("小甲cc");

console.log(hash.digest("hex"));
