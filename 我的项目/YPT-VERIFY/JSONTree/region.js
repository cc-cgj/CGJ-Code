import fs from "node:fs";
import { arrayToTree } from "./tree.js";

// 读取原始的JSON文件
// let data = fs.readFileSync("./sourceFile/region.json");
let data = fs.readFileSync("./sourceFile/广东省.json");

data = JSON.parse(data)["RECORDS"];

const treeMap = arrayToTree(data, "code", "super_code", "0", 3);

// 将结果写入到新的JSON文件中
fs.writeFileSync("./output/region.json", JSON.stringify(treeMap, null, 2));
