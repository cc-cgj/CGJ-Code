import axios from "axios";
import "reflect-metadata";
const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    /**
      * {} getList {
        value: [Function: getList],
        writable: true,
        enumerable: false,
        configurable: true
      }
     */
    axios.get(url).then((res) => {
      /**
       * res.data: { code,message,result }
       */
      const ResultKey = Reflect.getMetadata("key", target);
      // console.log(ResultKey); // result
      descriptor.value(ResultKey ? res.data[ResultKey] : res.data);
    });
  };
};

const Result = (resultKey: string): ParameterDecorator => {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    // console.log(target, propertyKey, parameterIndex); // {} getList 0
    Reflect.defineMetadata("key", resultKey, target);
  };
};

const Property: PropertyDecorator = (target: any, key) => {
  // target[key]是undefined
  console.log(target, key, target[key]);
};

class Http {
  @Property
  property = {
    age: 18,
  };
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(@Result("result") data: any) {
    // console.log(data);
  }
}

const http = new Http() as any;
