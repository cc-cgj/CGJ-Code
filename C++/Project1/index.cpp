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