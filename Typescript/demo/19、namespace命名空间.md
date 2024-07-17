### 我们在工作中无法避免全局变量造成的污染，TypeScript 提供了 namespace 避免这个问题出现

1. 内部模块，主要用于组织代码，避免命名冲突。
2. 命名空间内的类默认私有
3. 通过 export 暴露
4. 通过 namespace 关键字定义

TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。
相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

### 1.namespace 所有的变量以及方法必须要导出才能访问

```ts
namespace a {
  export const Time: number = 1000;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}

namespace b {
  export const Time: number = 1000;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}

a.Time;
b.Time;
```

### 2.嵌套命名空间

```ts
namespace a {
  export namespace b {
    export class Vue {
      parameters: string;
      constructor(parameters: string) {
        this.parameters = parameters;
      }
    }
  }
}

let v = a.b.Vue;

new v("1");
```

### 3.导入导出命名空间

```ts
// a.ts
export namespace V {
  export const a = 1;
}
```

```ts
// b.ts
import { V } from "./a.ts";
console.log(V); //{a:1}
```

### 4. 简化命名空间

```ts
namespace A {
  export namespace B {
    export const C = 1;
  }
}

import X = A.B.C;

console.log(X);
```

### 5. 合并命名空间

重名的命名空间会合并

```ts
namespace A {
  export const a = 1;
}
namespace A {
  export const b = 1;
}

A.a; // 1
A.b; // 1
```

### 6. 命名空间案例

1. 跨段项目 H5 Android IOS 小程序 等等

```ts
namespace H5 {
  // ...
}

namespace Android {
  // ...
}

namespace IOS {
  // ...
}
```
