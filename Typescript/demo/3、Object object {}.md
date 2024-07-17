### 1. Object

Object 类型是所有 Object 类的实例的类型。 由以下两个接口来定义：
Object 接口定义了 Object.prototype 原型对象上的属性；
ObjectConstructor 接口定义了 Object 类的属性， 如上面提到的 Object.create()。
这个类型是跟原型链有关的原型链顶层就是 Object，所以值类型和引用类型最终都指向 Object，所以他包含所有类型。

```ts
let a: Object = 123;
let a1: Object = "123";
let a2: Object = [];
let a3: Object = {};
let a4: Object = () => {};
```

### 2. object

object 代表所有非值类型的类型，例如 数组 对象 函数等，常用于泛型约束

```ts
let o: object = {}; //正确
let o1: object = []; //正确
let o2: object = () => 123; //正确
let b: object = "123"; //错误
let c: object = 123; //错误
```

### 3.看起来很别扭的一个东西 你可以把他理解成 new Object 就和我们的第一个 Object 基本一样 包含所有类型

tips 字面量模式是不能修改值的

```ts
let a1: {} = { name: 1 }; //正确
let a2: {} = () => 123; //正确
let a3: {} = 123; //正确
```
# 字面量模式
```ts
let a:{} = {name:"cgj"}
a.age = 18 //类型“{}”上不存在属性“age”
```
