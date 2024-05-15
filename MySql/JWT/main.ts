import "reflect-metadata"; //放到顶层支持反射
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import express from "express";
import { User } from "./src/user/controller";
import { UserServies } from "./src/user/servies";
import { PrismaClient } from "@prisma/client";
import { PrismaDB } from "./src/db";
import { JWT } from "./src/jwt";

const container = new Container();

/**
 * user模块
 */
container.bind(User).to(User);
container.bind(UserServies).to(UserServies);

/**
 * 封装PrismaClient
 */
container.bind<PrismaClient>("PrismaClient").toFactory(() => {
  return () => {
    return new PrismaClient();
  };
});
container.bind(PrismaDB).to(PrismaDB);

/**
 * JWT
 */
container.bind(JWT).to(JWT);

const server = new InversifyExpressServer(container);

// express 中间件
server.setConfig((app) => {
  app.use(express.json());
  app.use(container.get(JWT).init());
});

const app = server.build();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
