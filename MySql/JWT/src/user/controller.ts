import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";
import { UserServies } from "./servies";
import { inject } from "inversify";
import type { Request, Response } from "express";
import { JWT } from "../jwt";

// 定义接口
@controller("/user")
export class User {
  constructor(@inject(UserServies) private readonly UserServies: UserServies) {}

  @GetMapping("/index", JWT.middleware())
  public async getIndex(req: Request, res: Response) {
    console.log(req.user.name);
    let result = await this.UserServies.getList();
    res.send(result);
  }

  @PostMapping("/create")
  public async createUser(req: Request, res: Response) {
    let result = await this.UserServies.createUser(req.body);
    res.send(result);
  }

  @PostMapping("/login")
  public async login(req: Request, res: Response) {
    let result = await this.UserServies.login(req.body);
    res.send(result);
  }
}
