import express from "express";
import knex from "knex";
import shortid from "shortid";

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "cgj@123",
    database: "short_link",
  },
});

const app = express();
app.use(express.json());

// 1.接口创建短码并且关联url
app.post("/create_url", async (req, res) => {
  const short_id = shortid.generate();
  const { url } = req.body;
  await db("short").insert({
    short_id,
    url,
  });
  res.send(`http://127.0.0.1:3000/${short_id}`);
});
// 2.获取短码重定向到目标地址
app.get("/:short_id", async (req, res) => {
  const { short_id } = req.params;
  const result = await db("short").where({ short_id }).first();
  if (result) {
    res.redirect(result.url);
  } else {
    res.send("短码不存在");
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
