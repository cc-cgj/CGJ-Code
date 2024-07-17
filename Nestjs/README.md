### IOC 控制反转 DI 依赖注入

IOC

Inversion of Control 字面意思是控制反转，具体定义是高层模块不应该依赖低层模块，二者都应该依赖其抽象；抽象不应该依赖细节；细节应该依赖抽象。

DI

依赖注入（Dependency Injection）其实和 IoC 是同根生，这两个原本就是一个东西，只不过由于控制反转概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护对象关系），所以 2004 年大师级人物 Martin Fowler 又给出了一个新的名字：“依赖注入”。 类 A 依赖类 B 的常规表现是在 A 中使用 B 的 instance。

### 案例

## 未使用控制反转和依赖注入之前的代码

```js
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class B {
  age: number;
  entity: A;
  constructor(age: number) {
    this.age = age;
    this.entity = new A("小满");
  }
}

const c = new B(18);

c.entity.name;
```

我们可以看到，B 中代码的实现是需要依赖 A 的，两者的代码耦合度非常高。当两者之间的业务逻辑复杂程度增加的情况下，维护成本与代码可读性都会随着增加，并且很难再多引入额外的模块进行功能拓展。

### IOC 容器 (其实就是写了一个中间件，来收集依赖，主要是为了解耦，减少维护成本)

```js
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class C {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
//中间件用于解耦
class Container {
  modeuls: any;
  constructor() {
    this.modeuls = {};
  }
  provide(key: string, modeuls: any) {
    this.modeuls[key] = modeuls;
  }
  get(key) {
    return this.modeuls[key];
  }
}

const mo = new Container();
mo.provide("a", new A("小满1"));
mo.provide("c", new C("小满2"));

class B {
  a: any;
  c: any;
  constructor(container: Container) {
    this.a = container.get("a");
    this.c = container.get("c");
  }
}

new B(mo);
```

### nest cli 常用命令

```sh
  nest --help
  nest g co demo
  nest g mo demo
  nest g s demo
  nest g resource user
```

### RESTful 标准

1. API 风格

http://localhost:8080/api/get_list/1 查询 删除 更新

RESTful 风格一个接口就会完成 增删改差 他是通过不同的请求方式来区分的

查询 GET

提交 POST

更新 PUT PATCH

删除 DELETE

2. RESTful 版本控制

一共有三种我们一般用第一种 更加语义化

URI Versioning 版本将在请求的 URI 中传递（默认）
Header Versioning 自定义请求标头将指定版本
Media Type Versioning 请求的 Accept 标头将指定版本

```ts
//main.ts
import { VersioningType } from "@nestjs/common";
const app = await NestFactory.create(AppModule);
app.enableVersioning({
  type: VersioningType.URI,
});

//user/user.controller.ts
// @Controller('user') --> http:localhost:8080/user
// 所有接口
@Controller({
  path: 'user',
  version: '1',
})
// 单个接口
@Get()
@Version('1')
findAll() {
  return this.userService.findAll();
}
// http:localhost:8080/v1/user
```

3. Code 码规范

200 OK

304 Not Modified 协商缓存了

400 Bad Request 参数错误

401 Unauthorized token 错误

403 Forbidden referer origin 验证失败

404 Not Found 接口不存在

500 Internal Server Error 服务端错误

502 Bad Gateway 上游接口有问题或者服务器问题

### session 是服务器 为每个用户的浏览器创建的一个会话对象 这个 session 会记录到 浏览器的 cookie 用来区分用户

```sh
npm i express-session --save/-S
npm i @types/express-session -D
```

```ts
//main.ts
import * as session from "express-session";
app.use(
  session({
    secret: "xiaojia", //生成服务端session 签名 可以理解为加盐
    name: "xiaojia.sid", //生成客户端cookie 的名字 默认 connect.sid
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: null }, //设置返回到前端 key 的属性，默认值为{ path: '/', httpOnly: true, secure: false, maxAge: null }。
    rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
  })
);
```
