1. download 直接下载

```ts
  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname,'../images/1662894316133.png')
    res.download(url)
  }
```

2. 使用文件流的方式下载
   可以使用 compressing 把他压缩成一个 zip 包

```sh
  pnpm i compressing
```

```ts
// upload.controller.ts
import { Controller, Get, Param, Res } from "@nestjs/common";
import { zip } from "compressing";

@Controller("upload")
class UploadController {
  @Get("stream/:url")
  async down(@Param() param, @Res() res: Response) {
    const url = join(__dirname, "../images", param.url);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    res.setHeader("Content-Type", "application/octet-stream");

    res.setHeader("Content-Disposition", `attachment; filename=xiaoman`);

    tarStream.pipe(res);
  }
}
```

```ts
// 前端接受流
const useFetch = async (url: string) => {
  const res = await fetch(url).then((res) => res.arrayBuffer());
  console.log(res);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([res], {
      // type:"image/png"
    })
  );
  a.download = "xiaman.zip";
  a.click();
};

const download = () => {
  useFetch("http://localhost:3000/upload/stream/1662894316133.png");
};
```
