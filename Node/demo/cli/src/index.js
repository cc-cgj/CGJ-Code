#!/usr/bin/env node
// 告诉操作系统执行自定义命令的时候 你帮我用node去执行 这个文件

/**
 * 在 JavaScript 文件的头部声明 #!/usr/bin/env node 是一种特殊的注释，通常被称为 shebang（或 hashbang）。它的作用是告诉操作系统使用哪个解释器来执行该脚本文件
 *
 * #!（shebang）：
 *  这是一个特殊的字符序列，在大多数类Unix操作系统中，
 *  当操作系统读取一个文件时，如果遇到以 #! 开头的字符序列，
 *  它会将其后的内容解释为解释器的路径，并使用该路径指定的解释器来执行该文件。
 *
 * /usr/bin/env 是一个标准的Unix命令，它会在系统的 PATH 变量指定的目录中搜索某个命令，并执行找到的第一个命令。
 * 因此，/usr/bin/env 可以用来找到并执行环境中的某个命令，而不需要指定该命令的完整路径。
 *
 */
import { program } from "commander";
import fs from "node:fs";
import inquirer from "inquirer";
import { checkPath, dowmloadTemp } from "./utils.js";

let packageJson = fs.readFileSync("../package.json");
packageJson = JSON.parse(packageJson);

// test-cli -V
program.version(packageJson.version);

// test-cli create xiaojia
program
  .command("create <projectName>")
  .alias("c")
  .description("创建项目")
  .action((projectName) => {
    if (checkPath(projectName)) {
      console.log("文件夹已存在");
      return;
    }
    inquirer
      .prompt([
        {
          type: "input", //输入 input，confirm 确认框，list选择框
          name: "projectName", //返回值key
          message: "请输入项目名称", //描述
          default: projectName,
        },
        {
          type: "confirm",
          name: "isTs", //返回值key
          message: "是否选用typeScript模板",
        },
      ])
      .then((res) => {
        const { projectName, isTs } = res;

        dowmloadTemp(isTs ? "ts" : "js", projectName);
      });
  });

program.parse(process.argv);
