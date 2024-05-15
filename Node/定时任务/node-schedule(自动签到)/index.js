import schedule from "node-schedule";
import request from "request";
import config from "./config.js";

// // 每间隔五秒执行一次
// schedule.scheduleJob('*/5 * * * * *', function () {
//   console.log('每五秒执行一次')
// })

// // 半夜12点半执行一次
// schedule.scheduleJob('30 0 0 * * *', function () {
//   console.log('半夜12点半执行一次')
// })

// 每间隔五秒在掘金上签到
schedule.scheduleJob("*/5 * * * * *", function () {
  console.log("每五秒执行一次");
  request(
    config.check_url,
    {
      method: "POST",
      headers: {
        Referer: config.url,
        cookie: config.cookie,
      },
    },
    function (error, response, body) {
      console.log(body);
    }
  );
});
