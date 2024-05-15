import mysql2 from "mysql2/promise";
import fs from "fs";
import jsyaml from "js-yaml";
import express from "express";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");
const config = jsyaml.load(yaml);
const app = express();

app.use(express.json());

const sql = await mysql2.createConnection({
  ...config.db,
});

// 查询所有
app.get("/", async (req, res) => {
  const [data, asd] = await sql.query("select * from user");
  res.send(data);
});

// 查询单个
app.get("/user/:id", async (req, res) => {
  // const [data] = await sql.query(`select * from user where id = ${req.params.id}`)
  const [data, asd] = await sql.query("select * from user where id = ?", [
    req.params.id,
  ]);
  res.send(data);
});

// 新增
app.post("/create", async (req, res) => {
  const { name } = req.body;
  // await sql.query(`insert into user(x,x,x) values(?,?,?)`, [x,x,x]);
  await sql.query(`insert into user(name) values(?)`, [name]);
  res.send({
    code: 200,
    msg: "新增成功",
  });
});

// 编辑
app.post("/update", async (req, res) => {
  const { name, id } = req.body;
  await sql.query(`update user set name = ? where id = ?`, [name, id]);
  res.send({
    code: 200,
    msg: "编辑成功",
  });
});

// 删除
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await sql.query(`delete from user where id = ?`, [id]);
  res.send({
    code: 200,
    msg: "删除成功",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
