// import mysql2 from "mysql2/promise";
import knex from "knex";
import fs from "fs";
import jsyaml from "js-yaml";
import express from "express";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");
const config = jsyaml.load(yaml);
const app = express();

app.use(express.json());

// const sql = await mysql2.createConnection({
//   ...config.db,
// });
const db = knex({
  client: "mysql2",
  connection: config.db,
});

// 事务
// A-B转钱 100
// A扣掉100,sql1
// B增加100,sql2
// 保持事件的一致性，要么都成功，要么都回滚

function transactionExample() {
  db.transaction(async (trx) => {
    try {
      await trx("list").update({ money: -100 }).where({ id: 1 });
      await trx("list").update({ money: 100 }).where({ id: 2 });
      await trx.commit();
    } catch (err) {
      await trx.rollback();
    }
  });
}

// 创建一个table表
// knex创建表需要使用一个.then来接受，否则没效果
db.schema
  .createTableIfNotExists("list", (table) => {
    table.increments("id"); // id 主键 自增
    table.integer("age"); // a ge 整数
    table.string("name"); // name 字符串
    table.string("hobby"); // hobby 字符串
    table.timestamps(true, true); // 创建时间 更新时间
  })
  .then(() => {
    console.log("创建成功");
  });

// 调试sql
app.get("/sql", async (req, res) => {
  db.raw(`select * from list`).then((data) => {
    console.log(data);
  });
  const sql = await db("list").select().toSQL().sql;
  res.send(sql);
});

// 连表
app.get("/join", async (req, res) => {
  const table = await db("user").select().leftJoin("table", "user.id", "table.user_id");
  res.send(table);
});

// 查询所有
app.get("/", async (req, res) => {
  // const [data, asd] = await sql.query("select * from user");
  // 查询总数
  // const [total, asd] = await sql.query("select count(*) from user");
  // const data = await db("list").select();
  const data = await db("user").select().orderBy("id", "desc");
  const [{ total }] = await db("list").count("* as total");
  // [{total: number}]
  res.json({
    data,
    total,
  });
});

// 查询单个
app.get("/user/:id", async (req, res) => {
  // const [data] = await sql.query(`select * from user where id = ${req.params.id}`)
  // const [data, asd] = await sql.query("select * from user where id = ?", [req.params.id]);

  const data = await db("list").select().where({
    id: req.params.id,
  });
  res.send(data);
});

// 新增
app.post("/create", async (req, res) => {
  const { name, age, hobby } = req.body;
  // await sql.query(`insert into user(x,x,x) values(?,?,?)`, [x,x,x]);
  // await sql.query(`insert into user(name) values(?)`, [name]);

  await db("list").insert({
    name,
    age,
    hobby,
  });
  res.send({
    code: 200,
    msg: "新增成功",
  });
});

// 编辑
app.post("/update", async (req, res) => {
  console.log(req.body);
  const { name, age, hobby, id } = req.body;
  // await sql.query(`update user set name = ? where id = ?`, [name, id]);
  await db("list").update({ name, age, hobby }).where({ id });
  res.send({
    code: 200,
    msg: "编辑成功",
  });
});

// 删除
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await db("list").delete().where({ id });
  // await sql.query(`delete from user where id = ?`, [id]);
  res.send({
    code: 200,
    msg: "删除成功",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
