interface Obj1 {
  name: string;
}

type Obj2 = {
  name: string;
};

let a: Obj1 = { name: "a" };

let b: Obj2 = { name: "b" };

let user: Record<string, string>; // key string value string 的对象

/**
 * @error 不能将类型“Obj1”分配给类型“Record<string, string>”。类型“Obj1”中缺少类型“string”的索引签名。
 * 原因：interface可以声明合并，及相同的interface会进行合并，而Record需要明确interface里的属性
 * 解决方案：给interface中添加 [key: string]:string
 */
user = a;

/**
 * type是不能重复声明的
 */
user = b;
