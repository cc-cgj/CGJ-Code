import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "123456",
  },
});

// 1.创建索引 + 数据
const result = await client.index({
  index: "aaaa",
  document: {
    name: "小甲",
    age: 18,
  },
});

// 2.查询这个数据
const response = await client.get({
  index: "aaaa",
  id: result._id,
  // query: {
  //   match: {
  //     name: "小甲",
  //   },
  // },
});

// 3.搜索
const searchValue = await client.search({
  index: "aaaa",
  query: {
    match: {
      name: "小甲",
    },
  },
  size: 1,
});

// 4.删除
await client.delete({
  index: "aaaa",
  id: result._id,
});

console.log(searchValue.hits.hits);
