#include<iostream>
#include<Windows.h> // .hͷ�ļ�

#define Max 10;

using std::cout;
using std::endl;

namespace Napi {
	int env = 10;
}
using Napi::env;


int main() {
	// int b = Max;
	// cout << "���C++" << env << b << endl;
	int cx = GetSystemMetrics(SM_CXSCREEN);
	int cy = GetSystemMetrics(SM_CYSCREEN);
	cout << "���:" << cx << "�߶�:" << cy << endl;
	return 0;
}