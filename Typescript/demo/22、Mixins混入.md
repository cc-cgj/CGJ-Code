TypeScript 混入 Mixins 其实 vue 也有 mixins 这个东西 你可以把他看作为合并

### 1. 对象混入

1. Object.assign 浅拷贝 交叉类型
   可以使用 es6 的 Object.assign 合并多个对象
   此时 people 会被推断成一个交差类型 Name & Age & sex;

```ts
interface Name {
  name: string;
}
interface Age {
  age: number;
}
interface Sex {
  sex: number;
}

let people1: Name = { name: "小满" };
let people2: Age = { age: 20 };
let people3: Sex = { sex: 1 };

const people = Object.assign(people1, people2, people3);

// structuredClone 深拷贝
// node 18 以上支持
const people = structuredClone(people1, people2, people3);
```

2. 扩展运算符 浅拷贝 返回新的类型

```ts
const people = { ...people1, ...people2, ...people3 };
```

### 2.类的混入

```ts
class Html {
  render() {
    console.log("render");
  }
}
class Logger {
  log(msg: string) {
    console.log("log----", msg);
  }
}

class App {
  run() {
    console.log("run");
  }
}

// IOC 控制反转
// 插件类型的混入
// 将 Html、Logger 插件类混入到 App中

// 约束传递的参数必须是类
type Constructor<T> = new (...args: any[]) => T;

function pluginMixins<T extends Constructor<App>>(Base: T) {
  return class extends Base {
    private Logger = new Logger();
    private Html = new Html();
    constructor(...args: any[]) {
      super(...args);
      this.Logger = new Logger();
      this.Html = new Html();
    }
    run(): void {
      this.Logger.log("run");
    }
    render(): void {
      this.Html.render();
    }
  };
}

const mixins = pluginMixins(App);

const app = new mixins();

app.run();

app.render();
```
