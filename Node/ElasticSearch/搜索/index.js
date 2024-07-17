import fs from "node:fs";
import { Client } from "@elastic/elasticsearch";

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "123456",
  },
});

//ES创建索引不能重复
const exists = await client.indices.exists({ index: "userinfo" });

// 判断索引不存在，创建索引
if (!exists) {
  await client.indices.create({
    index: "userinfo",
    mappings: {
      properties: {
        name: {
          type: "text", //全文匹配
          fields: {
            // 精准匹配
            keyword: {
              type: "keyword",
            },
          },
        },
        email: {
          type: "text",
        },
        age: {
          type: "integer",
        },
        phone: {
          type: "keyword",
        },
        id: {
          type: "text",
        },
      },
    },
  });

  // 插入数据
  const operations = [];
  data.forEach((item) => {
    operations.push({
      index: {
        _index: "userinfo",
        _id: item.id,
      },
    });
    operations.push(item);
  });
  // 批量插入ES
  await client.bulk({ operations });
  console.log("插入成功");
}

// 1. 全部查询
// const response = await client.search({
//   index: "userinfo",
//   body: {
//     query: {
//       match_all: {}, //查询全部
//     },
//     // 默认返回10条,可以通过size指定
//     // size: 1000,
//   },
// });
// console.log(response.hits.hits);
// console.log(response.hits.total);

// 2.模糊查询
// 模糊查询会进行分词，匹配所有的关键词, 会把委子分成2个词，然后查询2个词
// const response2 = await client.search({
//   index: "userinfo",
//   body: {
//     query: {
//       match: {
//         name: "委子",
//       },
//     },
//     // 默认返回10条,可以通过size指定
//     // size: 1000,
//   },
// });

// console.log(response2.hits.hits);

// 3.精确查询
// 因为 text 类型默认会支持分词，为了全文搜索设计，但是如果要同时支持 全文匹配 + 精准匹配 需要设置 type keyword

// const response3 = await client.search({
//   index: "userinfo",
//   body: {
//     query: {
//       term: {
//         "name.keyword": "嘉梓晨",
//       },
//     },
//     // 默认返回10条,可以通过size指定
//     // size: 1000,
//   },
// });

// console.log(response3.hits.hits);

// 4.组合查询
// const response4 = await client.search({
//   index: "userinfo",
//   body: {
//     query: {
//       bool: {
//         // 必须匹配其中一个词或全称
//         must: {
//           match: {
//             name: "嘉梓晨",
//           },
//         },
//         // 过滤
//         filter: {
//           range: {
//             age: {
//               gte: 20, //大于等于
//               lte: 30, //小于等于
//             },
//           },
//         },
//         // // 不包含什么
//         must_not: {
//           match: {
//             name: "漆梓",
//           },
//         },
//         // 可选值
//         should: {
//           match: {
//             name: "仇英",
//           },
//         },
//       },
//     },
//     // 默认返回10条,可以通过size指定
//     // size: 1000,
//   },
// });

// console.log(response4.hits.hits);

// 5.聚合查询
const response5 = await client.search({
  index: "userinfo",
  aggs: {
    // 聚合查询
    age: {
      // 查询age出现的最大值
      // max: {
      //   field: "age",
      // },

      // 查询age值出现的次数
      terms: {
        field: "age",
      },
    },
  },
});
// console.log(response5.aggregations);
console.log(response5.aggregations.age.buckets);
