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
