``` shell
  prisma init -h
  prisma init --datasource-provider mysql
  prisma migrate dev

### IOC
### 通过一个Container类，使A能调用B的前提下将B从A中解耦
``` js
  class A {
    constructor() {
      new B();
    }
  }
  class B {
    constructor() {}
  }
  class Container {
    constructor() {
      new A();
      new B();
    }
  }

### JWT
  JWT由三部分组成，它们通过点（.）进行分隔：
    Header（头部）：包含了令牌的类型和使用的加密算法等信息。通常采用Base64编码表示。
    Payload（负载）：包含了身份验证和授权等信息，如用户ID、角色、权限等。也可以自定义其他相关信息。同样采用Base64编码表示。
    Signature（签名）：使用指定的密钥对头部和负载进行签名，以确保令牌的完整性和真实性。
