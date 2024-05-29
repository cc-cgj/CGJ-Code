### 应用场景

    云游戏

### 环境准备

    1. 安装python
    2. C++
    3. npm install node-gyp -g

### 项目依赖

    1. screenshot-desktop 截屏
    2. ws 实时传输
    3. get-pixels 获取图片大小
    4. robotjs 操作受控设备

# 根据当前的维护状态，robotjs 适用于 Node.js 12.x 到 14.x 版本。建议在这些版本中使用

# 因为 robotjs 需要依赖于 c++ node-gyp 依赖 python 需要通过 node-gyp 编译 robotjs

### 对于 Python 3.10 及以上版本，distutils 被拆分到单独的包 setuptools 中，因此需要手动安装：

```sh
  python -m pip install setuptools
```

### 使用 http-server 启动 html

    因为live-server启动，根目录有文件变化就是重启，所以使用http-server启动html
    http-server -p 9999

    ```sh
        npm i http-server -g
    ```
