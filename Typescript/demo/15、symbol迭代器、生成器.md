### 生成器

```ts
function* generator() {
  yield 1; // 同步或异步
  yield Promise.resolve(1); // 同步或异步
}

const man = generator();
man.next();
```

### 1. Symbol.iterator 迭代器

```ts
// 支持遍历大部分类型迭代器 arr nodeList argumetns set map 等
var arr = [1, 2, 3, 4];
let iterator = arr[Symbol.iterator]();

console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next()); //{ value: 2, done: false }
console.log(iterator.next()); //{ value: 3, done: false }
console.log(iterator.next()); //{ value: 4, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }
```

### 2. 测试用例

```ts
interface Item {
  age: number;
  name: string;
}

const array: Array<Item> = [
  { age: 123, name: "1" },
  { age: 123, name: "2" },
  { age: 123, name: "3" },
];

type mapTypes = string | number;
const map: Map<mapTypes, mapTypes> = new Map();

map.set("1", "王爷");
map.set("2", "陆北");

const obj = {
  aaa: 123,
  bbb: 456,
};

let set: Set<number> = new Set([1, 2, 3, 4, 5, 6]);
// let it:Iterator<Item> = array[Symbol.iterator]()

// for of 源码
const each = (erg: any): void => {
  let it: Iterator<any> = erg[Symbol.iterator]();
  let next: any = { done: false };
  while (!next.done) {
    next = it.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
};
each(array);

```

### 3. 我们平时开发中不会手动调用 iterator 应为 他是有语法糖的就是 for of 记住 for of 是不能循环对象的，因为对象没有 iterator

Symbol.for 方法会根据给定的参数，搜索全局有没有以该参数作为名称的 Symbol 值。
如果有，就返回这个 Symbol 值，否则就新建并返回一个以该参数作为名称的 Symbol 值。

```ts
for (let value of map) {
  console.log(value);
}
```

### 4. 数组解构的原理其实也是调用迭代器的(iterator调用next)

```ts
var [a, b, c] = [1, 2, 3];

var x = [...xxxx];
```

### 5. 那我们可以自己实现一个迭代器让对象支持 for of

```ts
const obj = {
  max: 5,
  current: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.current == this.max) {
          return {
            value: undefined,
            done: true,
          };
        } else {
          return {
            value: this.current++,
            done: false,
          };
        }
      },
    };
  },
};
console.log([...obj]);

for (let val of obj) {
  console.log(val);
}
```

### 以下为这些symbols的列表：

1. Symbol.hasInstance
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

2. Symbol.isConcatSpreadable
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

3. Symbol.iterator
方法，被for-of语句调用。返回对象的默认迭代器。

4. Symbol.match
方法，被String.prototype.match调用。正则表达式用来匹配字符串。

5. Symbol.replace
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

6. Symbol.search
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

7. Symbol.species
函数值，为一个构造函数。用来创建派生对象。

8. Symbol.split
方法，被String.prototype.split调用。正则表达式来用分割字符串。

9. Symbol.toPrimitive
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

10. Symbol.toStringTag
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

11. Symbol.unscopables
对象，它自己拥有的属性会被with作用域排除在外。