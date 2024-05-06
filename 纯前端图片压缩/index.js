"use strict";
class CompressImage {
    constructor(options) {
        this.fileReader = new FileReader(); // 文件读取器
        this.options = options;
        this.createBase64();
    }
    createBase64() {
        this.fileReader.readAsDataURL(this.options.file); //file对象传进去就会返回base64
        this.fileReader.onload = (e) => {
            var _a;
            const base64Url = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            this.compress(base64Url);
        };
    }
    compress(url) {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        img.src = url;
        img.onload = () => {
            var _a, _b;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, img.width, img.height);
            // 原始: 321 KB, 普通压缩: 126 kB, 压缩0.1倍 10.1 kB
            const base64 = canvas.toDataURL(this.options.file.type, this.options.quality);
            (_b = (_a = this.options).success) === null || _b === void 0 ? void 0 : _b.call(_a, base64);
        };
    }
}
const file = document.querySelector("#file");
file.addEventListener("change", (event) => {
    var _a;
    const target = event.target;
    const fileObject = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
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
