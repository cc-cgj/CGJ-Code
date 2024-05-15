
### node中实现调用c++函数

### c++编写的代码能够被编译成一个动态链接库(dll),可以被nodejs require引入使用，后缀是.node
  .node文件的原理就是(window dll) (Mac dylib) (Linux so)

### node-gyp
  npm install node-gyp -g #全局安装
  c++ 编译为 .node文件，通过require来使用
  基于python编写

### npm install node-addon-api -D #装到项目里
  package.json 设置 gypfile:true

### 编译
  ## 生成配置文件
    node-gyp configure
  ## 打包addon
    node-gyp build 
  

```c++
  // index.cpp
  #include<iostream>
  #include<Windows.h> // .h头文件

  #define Max 10;

  using std::cout;
  using std::endl;

  namespace Napi {
    int env = 10;
  }
  using Napi::env;


  int main() {
    // int b = Max;
    // cout << "你好C++" << env << b << endl;
    int cx = GetSystemMetrics(SM_CXSCREEN);
    int cy = GetSystemMetrics(SM_CYSCREEN);
    cout << "宽度:" << cx << "高度:" << cy << endl;
    return 0;
  }