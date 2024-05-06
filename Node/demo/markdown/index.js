const ejs = require("ejs");
const fs = require("node:fs");
const marked = require("marked");
const browserSync = require("browser-sync");

let browser;

const openBrowser = () => {
  browser = browserSync.create();
  browser.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
  });
};

const init = (callback) => {
  const readmeFile = fs.readFileSync("README.md");
  ejs.renderFile(
    "template.ejs",
    {
      content: marked.parse(readmeFile.toString()),
      title: "markdown to html",
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const writeStream = fs.createWriteStream("index.html");
      writeStream.write(data);
      writeStream.close();
      writeStream.on("finish", () => {
        callback && callback();
      });
    }
  );
};

init(() => {
  console.log("markdown文件转位html成功！");
  openBrowser();
});

fs.watchFile("README.md", (cur, prev) => {
  if (cur.mtime !== prev.mtime) {
    console.log("文件发生变化！");
    init(() => {
      browser.reload();
    });
  }
});
