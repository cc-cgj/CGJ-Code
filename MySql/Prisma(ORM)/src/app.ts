import express from "express";
import { PrismaClient } from "prisma/prisma-client";
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// 查询
app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    /**
     * 包含配置对象，指定需要包含的关联表的数据。
     * 本对象用于指示在查询时是否需要同时加载`posts`这个关联表的数据。
     *
     * @property {boolean} posts - 指示是否包含`posts`关联数据。值为`true`表示包含。
     */
    include: {
      posts: true,
    },
  });
  res.send(data);
});

// 单条查询
app.get("/user/:id", async (req, res) => {
  const data = await prisma.user.findMany({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(data);
});

// 编辑
app.post("/update", async (req, res) => {
  const { id, name, email } = req.body;
  const data = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.send(data);
});

// 删除
app.post("/delete", async (req, res) => {
  const { id } = req.body;

  await prisma.post.deleteMany({
    where: {
      authorId: Number(id),
    },
  });

  // Foreign key constraint failed on the field: `authorId`
  // 在user表中id有关联post表外键authorId，所以需要先删除post关联表中的数据
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

// 新增
app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        // create: {
        //   title: "Hello World",
        //   content: "This is my first post",
        // },
        create: [
          {
            title: "文章1",
            content: "文章1的内容",
          },
          {
            title: "文章2",
            content: "文章2的内容",
          },
        ],
      },
    },
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
