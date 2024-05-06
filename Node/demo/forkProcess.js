process.on("message", (msg) => {
  console.log(`子进程收到消息了: `, msg);
});


process.send('我是子进程，收到请回答！')