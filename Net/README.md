### express等都是在网络通讯的应用层进行通讯

### net 可以在传输层进行通讯，传输层是基于 TCP/IP | UDP/IP 协议的
### 端口号是在传输层实现的


### 场景
  ## 1.服务端之间的通讯
    双工通讯 server.js -> <- client.js
  ## 2.从传输层实现http协议
    http.js