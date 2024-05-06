const commonDecorator: ClassDecorator = (target: Function) => {
  target.prototype.eat = () => {
    console.log("吃饭");
  };
};
@commonDecorator
class Person {}
const p = new Person();
(p as any).eat();
