const util = require("node:util");

// 1.promisify

// 2.callbackify

// 3.format
/**
 * 类似于C语言的printf
 * %s 匹配字符串，%d 匹配数字
 */

console.log(util.format("%s---%s---%d", "小甲", "xz", 12));

// 如果不传入格式化参数 就按空格分开
console.log(util.format(1, 2, 3)); //1 2 3
