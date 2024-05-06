interface Options {
  file: File;
  quality?: number; //0.1-1
  success?: (base64: string) => void;
}

class CompressImage {
  options: Options;
  fileReader = new FileReader(); // 文件读取器
  constructor(options: Options) {
    this.options = options;

    this.createBase64();
  }
  createBase64() {
    this.fileReader.readAsDataURL(this.options.file); //file对象传进去就会返回base64
    this.fileReader.onload = (e) => {
      const base64Url = e.target?.result;
      this.compress(base64Url as string);
    };
  }
  compress(url: string) {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      // 原始: 321 KB, 普通压缩: 126 kB, 压缩0.1倍 10.1 kB
      const base64 = canvas.toDataURL(
        this.options.file.type,
        this.options.quality
      );
      this.options.success?.(base64);
    };
  }
}

const file = document.querySelector("#file") as HTMLInputElement;

file.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const fileObject = target.files?.[0];
  if (fileObject) {
    new CompressImage({
      file: fileObject,
      quality: 0.1,
      success(base64) {
        document.body.innerHTML = `<img src="${base64}" />`;
      },
    });
  }
});
