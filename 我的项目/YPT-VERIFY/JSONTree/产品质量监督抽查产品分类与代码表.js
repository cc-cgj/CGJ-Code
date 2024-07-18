import fs from "node:fs";

// 读取原始的JSON文件
let data = fs.readFileSync("./sourceFile/产品质量监督抽查产品分类与代码表.json");
data = JSON.parse(data)["产品质量监督抽查产品分类与代码"];

data = data.map((node) => ({
  name: node["产品大类名称"],
  id: node["产品大类名称"],
  childName: node["产品中类名称"],
  childId: node["产品中类名称"],
  parentId: node["产品大类名称"],
}));

// 创建一个映射，将每个节点的id映射到对应的对象
let set = new Set();
let result = [];
data.forEach((node) => {
  // 如果找到了父节点，就添加到父节点的children数组中
  if (set.has(node.id)) {
    result.at(-1).children.push({
      name: node.childName,
      id: node.childId,
      parentId: node.parentId,
    });
  } else {
    set.add(node.id);
    // 如果没有找到父节点，就添加到结果数组中
    result.push({
      id: node.id,
      name: node.name,
      children: [
        {
          name: node.childName,
          id: node.childId,
          parentId: node.parentId,
        },
      ],
    });
  }
});

// 将结果写入到新的JSON文件中
fs.writeFileSync("output/产品质量监督抽查产品分类与代码表.json", JSON.stringify(result, null, 2));
