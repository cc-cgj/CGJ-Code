import fastify from "fastify";

const app = fastify({
  logger: true, // 开启日志
});

// 没有 reply.json 方法

// 1. 给前端返回值 reply.send(字符串|数组|对象)
// 2. 直接return返回值
app.get("/", (request, reply) => {
  return { h: "hello world" };
});

// 天然支持post
app.post("/", (request, reply) => {
  console.log(request.body);
  return { hello: "world" };
});

// 路由
app.route({
  url: "/add",
  method: "POST",
  // 序列化入参及出参
  schema: {
    body: {
      type: "object", //要求前端传入一个对象 { name , age} 否则 报 400
      properties: {
        name: {
          type: "string",
        },
        age: {
          type: "number",
        },
      },
      required: ["name", "age"],
    },
    // 配置出参 可以 提高吞吐率
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                age: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  },
  handler(request, reply) {
    return {
      message: "success",
      data: [
        {
          name: "小甲",
          age: 18,
        },
      ],
    };
  },
});

// 插件
app.register(
  function (fastify, opts, done) {
    // 定义一个公共方法  app.add(1,2)
    // fastify.decorate("add", (a, b) => a + b);
    // const a = fastify.add(1,2)
    // console.log(a);

    console.log(opts);

    // done === next
    done();
  },
  {
    name: "add",
  }
);

// 连接mysql
// cjs commonjs require('@fastify/mysql')
// esm import('@fastify/mysql')
app.register(import("@fastify/mysql"), {
  // mysql://账号:密码@localhost:端口/数据库名
  connectionString: "mysql://root:cgj@123@localhost:3306/fastify",
});

app.post("/create", (req, reply) => {
  app.mysql.query(
    "insert into user(name,age,time) values(?,?,?)",
    [req.body.name, req.body.age, new Date()],
    function (err, result) {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
});

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`server listening on http://localhost:3000`);
  });
