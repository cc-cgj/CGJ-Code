/** @类装饰器 */
// const doc: ClassDecorator = (target: any) => {
//   console.log(target);
//   target.prototype.name = "A";
// };

// @doc
// class A {
//   constructor() {}
// }

// const a: any = new A();
// console.log(a.name);

/** @属性装饰器 */
// const doc: PropertyDecorator = (target: any, key: string | symbol) => {
//   // target为原型对象
//   console.log(target, key);
// };

// class A {
//   @doc
//   public name: string;
//   constructor() {
//     this.name = "小甲";
//   }
// }
// const a: any = new A();
// console.log(a.name);

/** @方法装饰器 */
// const doc: MethodDecorator = (target: any, key: string | symbol, descriptor: any) => {
//   // target为原型对象
//   console.log(target, key, descriptor);
// };

// class A {
//   public name: string;
//   constructor() {
//     this.name = "小甲";
//   }
//   @doc
//   getName() {
//     return this.name;
//   }
// }
// const a: any = new A();
// console.log(a.name);

/** @参数装饰器 */
const doc: ParameterDecorator = (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
  // target为原型对象
  console.log(target, propertyKey, parameterIndex);
};

class A {
  public name: string;
  constructor() {
    this.name = "小甲";
  }

  getName(name: string, @doc age: number) {
  }
}
const a: any = new A();
