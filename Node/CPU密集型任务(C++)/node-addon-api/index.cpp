#define NAPI_VERSION 3      // 指定addon版本
#define NAPI_CPP_EXCEPTIONS // 启用Node.js N-API 中的C++异常支持
#include <napi.h>           //addon API
#include <Windows.h>        // .h头文件

Napi::Value getScreenSize(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env(); // 指定环境

  int cx = GetSystemMetrics(SM_CXSCREEN); // 获取设备宽
  int cy = GetSystemMetrics(SM_CYSCREEN); // 获取设备高

  Napi::Object result = Napi::Object::New(env); //创建一个对象

  result.Set("width", cx);
  result.Set("height", cy);
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  //抛出一个函数  getScreenSize 
  exports.Set("getScreenSize", Napi::Function::New(env, getScreenSize));
  return exports;
}

// addon固定语法 必须抛出这个方法
NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);