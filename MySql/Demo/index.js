import mysql2 from "mysql2/promise";
import fs from "fs";
import jsyaml from "js-yaml";
import express from "express";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");
const config = jsyaml.load(yaml);
const app = express();

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

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
