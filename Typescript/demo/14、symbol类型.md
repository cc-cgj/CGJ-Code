自 ECMAScript 2015 起，symbol 成为了一种新的原生类型，就像 number 和 string 一样。

symbol 类型的值是通过 Symbol 构造函数创建的。

### 1. 可以传递参做为唯一标识 只支持 string 和 number 类型的参数 undefined

```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

### 2. Symbol 的值是唯一的

```ts
const s1 = Symbol();
const s2 = Symbol();
// s1 === s2 =>false
```

### 3. Symbol.for

Symbol.for 方法会根据给定的参数，搜索全局有没有以该参数作为名称的 Symbol 值。
如果有，就返回这个 Symbol 值，否则就新建并返回一个以该参数作为名称的 Symbol 值。

```ts
console.log(Symbol.for("11") === Symbol.for("11")); // true
```

### 4. 用作对象属性的键

```ts
let sym = Symbol();

let obj = {
  [sym]: "value",
};

console.log(obj[sym]); // "value"

// 避免对象合并属性覆盖

let a1 = Symbol(1);
let a2 = Symbol(1);
let obj2 = {
  name: "李四",
};
let obj = {
  name: "张三",
  ...obj2,
  name: 1, // 此时会覆盖

  [a1]: 1,
  [a2]: 2,
};
// { name: '张三', [Symbol(1)]: 1, [Symbol(1)]: 2 }
```

### 5. 使用 symbol 定义的属性，是不能通过如下方式遍历拿到的

```ts
const symbol1 = Symbol("666");
const symbol2 = Symbol("777");
const obj1 = {
  [symbol1]: "小满",
  [symbol2]: "二蛋",
  age: 19,
  sex: "女",
};
// 1 for in 遍历
for (const key in obj1) {
  // 注意在console看key,是不是没有遍历到symbol1
  console.log(key);
}
// 2 Object.keys 遍历
Object.keys(obj1);
console.log(Object.keys(obj1));
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1));
// 4 JSON.stringfy
console.log(JSON.stringify(obj1));

// 如何拿到
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1);
console.log(Object.getOwnPropertySymbols(obj1));
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1);
console.log(Reflect.ownKeys(obj1));
```
