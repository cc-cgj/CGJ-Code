import axios from "axios";

const Get = (url: string) => {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    const fuc = descriptor.value;
    axios
      .get(url)
      .then((res) => {
        fuc.call(target, res.data, {
          status: 200,
          statusText: "ok",
        });
      })
      .catch((err) => {
        fuc.call(target, err, {
          status: 500,
          statusText: "error",
        });
      });
  };
};

class Constroller {
  constructor() {}
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getUser(res: any, status: any) {
    console.log(res.result.list, status);
  }
}
