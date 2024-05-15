const { Configuration } = require("webpack");
const path = require("path");
const { DllPlugin } = require("webpack");

/**
 * @type {Configuration}
 */

const config = {
  entry: {
    vue: ["vue", "vue-router", "pinia"], // 提取第三方库
  },
  mode: "development",
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "dll"),
  },
  plugins: [
    new DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "dll", "[name].manifest.json"), //缓存文件
    }),
  ],
};

module.exports = config;
