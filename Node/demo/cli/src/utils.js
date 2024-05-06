import fs from "node:fs";
import download from "download-git-repo";
import ora from "ora";



export const checkPath = (path) => {
  return fs.existsSync(path);
};

export const dowmloadTemp = (branch, dirName) => {
  const spinner = ora("下载中...").start();
  return new Promise((resolve, reject) => {
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      dirName,
      {
        clone: true,
      },
      (err) => {
        if (err) reject(err);
        resolve();
        spinner.succeed("下载完成");
      }
    );
  });
};
