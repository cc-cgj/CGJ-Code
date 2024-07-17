Decorator 装饰器是一项实验性特性，在未来的版本中可能会发生改变
它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能

若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用编译器选项
![alt text](<images/23、装饰器 Decorator/若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用编译器选项.png>)

### 1.类装饰器 ClassDecorator

```ts
const watcher: ClassDecorator = (target: Function) => {
  // target是A的构造函数
  target.prototype.getParams = <T>(params: T): T => {
    return params;
  };
};

@watcher
class A {
  constructor() {}
}

// 验证
const a = new A();
console.log((a as any).getParams("123"));
```

### 2.装饰器工厂

其实也就是一个高阶函数 外层的函数接受值 里层的函数最终接受类的构造函数

```ts
// 传参，通过函数柯里化

const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params;
    };
    target.prototype.getOptions = (): string => {
      return name;
    };
  };
};

@watcher("name")
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams("123"));
```

### 3.方法装饰器 MethodDecorator

```ts
import axios from "axios"; //也可以在node环境下运行
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    /**
      * {} getList {
        value: [Function: getList],
        writable: true,
        enumerable: false,
        configurable: true
      }
     */
    axios.get(url).then((res) => {
      descriptor.value(res.data);
    });
  };
};

class Http {
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(data: any) {
    console.log(data.result.list);
  }
}

// 方法装饰器会在类new的时候被调用
const http = new Http() as any;
```

### 4.参数装饰器 ParameterDecorator

```ts
import axios from "axios";
import "reflect-metadata";
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    /**
      * {} getList {
        value: [Function: getList],
        writable: true,
        enumerable: false,
        configurable: true
      }
     */
    axios.get(url).then((res) => {
      /**
       * res.data: { code,message,result }
       */
      const ResultKey = Reflect.getMetadata("key", target);
      // console.log(ResultKey); // result
      descriptor.value(ResultKey ? res.data[ResultKey] : res.data);
    });
  };
};

const Result = (resultKey: string): ParameterDecorator => {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // console.log(target, propertyKey, parameterIndex); // {} getList 0
    Reflect.defineMetadata("key", resultKey, target);
  };
};

class Http {
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(@Result("result") data: any) {
    console.log(data);
  }
}

const http = new Http() as any;
```



### 5.元数据存储 import 'reflect-metadata'

可以快速存储元数据然后在用到的地方取出来 defineMetadata getMetadata

```sh
npm i reflect-metadata
```

```ts
//1.类装饰器 ClassDecorator
//2.属性装饰器 PropertyDecorator
//3.参数装饰器 ParameterDecorator
//4.方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'
//5.装饰器工厂

import axios from "axios";
import "reflect-metadata";
const Base = (base: string) => {
  const fn: ClassDecorator = (target) => {
    target.prototype.base = base;
  };
  return fn;
};

const Get = (url: string) => {
  const fn: MethodDecorator = (target: any, key, descriptor: PropertyDescriptor) => {
    axios.get(url).then((res) => {
      const key = Reflect.getMetadata("key", target);
      descriptor.value(key ? res.data[key] : res.data);
    });
  };
  return fn;
};

const result = () => {
  const fn: ParameterDecorator = (target: any, key, index) => {
    Reflect.defineMetadata("key", "result", target);
  };
  return fn;
};

const Bt: PropertyDecorator = (target, key) => {
  console.log(target, key);
};

@Base("/api")
class Http {
  @Bt
  xiaoman: string;
  constructor() {
    this.xiaoman = "xiaoman";
  }
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(@result() data: any) {
    // console.log(data)
  }
  // @Post('/aaaa')
  create() {}
}

const http = new Http() as any;

// console.log(http.base)
```

### 6.属性装饰器 PropertyDecorator

```ts
import axios from "axios";
import "reflect-metadata";
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    /**
      * {} getList {
        value: [Function: getList],
        writable: true,
        enumerable: false,
        configurable: true
      }
     */
    axios.get(url).then((res) => {
      /**
       * res.data: { code,message,result }
       */
      const ResultKey = Reflect.getMetadata("key", target);
      // console.log(ResultKey); // result
      descriptor.value(ResultKey ? res.data[ResultKey] : res.data);
    });
  };
};

const Result = (resultKey: string): ParameterDecorator => {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // console.log(target, propertyKey, parameterIndex); // {} getList 0
    Reflect.defineMetadata("key", resultKey, target);
  };
};

const Property: PropertyDecorator = (target: any, key) => {
  // target[key]是undefined
  console.log(target, key, target[key]);
};

class Http {
  @Property
  property = {
    age: 18,
  };
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(@Result("result") data: any) {
    // console.log(data);
  }
}

const http = new Http() as any;

```