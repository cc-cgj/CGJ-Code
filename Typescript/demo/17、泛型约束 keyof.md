### 泛型约束

```ts
// 我们期望在一个泛型的变量上面，获取其 length 参数，但是，有的数据类型是没有 length 属性的
function getLegnth<T>(arg: T) {
  return arg.length;
}

// 我们就得对使用的泛型进行约束，我们约束其为具有length属性的类型，这里我们会用到interface,代码如下
interface Len {
  length: number;
}

function getLegnth<T extends Len>(arg: T) {
  return arg.length;
}

getLegnth<string>("123");

// 运算符“+”不能应用于类型“T”和“T”
// function add<T>(a:T,b:T){
// 进行类型约束
function add<T extends number>(a: T, b: T) {
  return a + b;
}
```

### 使用 keyof 约束对象

其中使用了 TS 泛型和泛型约束。

首先定义了 T 类型并使用 extends 关键字继承 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，它的返回 类型是联合 类型，

最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型

```ts
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let o = { a: 1, b: 2, c: 3 };

prop(o, "a");
prop(o, "d"); //此时就会报错发现找不到

type Key = keyof typeof o; // "a" | "b" | "c"
```

### keyof 高级用法: 循环遍历 interface的 key

```ts
interface Data {
  name: string;
  age: number;
  sex: boolean;
}

// keyof 转为联合类型，通过key in 循环联合类型
type Options<T extends object> = {
  readonly [key in keyof T]?: T[key];
};

type B = Options<Data>;

const obj: Options<Data> = {};
```

### 泛型类

声明方法跟函数类似名称后面定义<类型>

使用的时候确定类型 new Sub<number>()

```ts
class Sub<T> {
  attr: T[] = [];
  add(a: T): T[] {
    return [a];
  }
}

let s = new Sub<number>();
s.attr = [1, 2, 3];
s.add(123);

let str = new Sub<string>();
str.attr = ["1", "2", "3"];
str.add("123");
```
