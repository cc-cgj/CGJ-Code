### Providers

Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。

# xx.module.ts
# xx.controller.ts


1. 语法糖
![alt text](images/语法糖(module).png)
![alt text](images/语法糖(controller).png)

2. service 第二种用法(自定义名称)
语法糖全称
![alt text](images/自定义(module).png)
自定义名称之后 需要用对应的Inject 取 不然会找不到的
![alt text](images/自定义(controller).png)

3. 自定义注入值
通过 useValue
![alt text](images/自定义注入值(module).png)
![alt text](images/自定义注入值(controller).png)

4. 工厂模式
如果服务 之间有相互的依赖 或者逻辑处理 可以使用 useFactory
![alt text](images/工厂模式(module).png)
![alt text](images/工厂模式(controller).png)

5. 异步模式
useFactory 返回一个promise 或者其他异步操作
![alt text](images/异步模式(module).png)