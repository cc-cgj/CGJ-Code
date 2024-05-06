// 发布订阅设计模式
const event = require("events");

const eventEmitter = new event();

eventEmitter.on("msg", (...args) => {
  console.log(...args);
});

eventEmitter.emit("msg", "小甲", "小甲2");
