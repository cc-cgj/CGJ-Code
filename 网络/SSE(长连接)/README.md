### 概述

SSE（Server-Sent Events）是一种用于实现服务器主动向客户端推送数据的技术，也被称为“事件流”（Event Stream）。它基于 HTTP 协议，利用了其长连接特性，在客户端与服务器之间建立一条持久化连接，并通过这条连接实现服务器向客户端的实时数据推送。

### SSE 和 Socket 区别

## 相同

SSE（Server-Sent Events）和 WebSocket 都是实现服务器向客户端实时推送数据的技术，但它们在某些方面还是有一定的区别。

### 不同

1. 技术实现
   SSE 基于 HTTP 协议，利用了其长连接特性，通过浏览器向服务器发送一个 HTTP 请求，建立一条持久化的连接。
   而 WebSocket 则是通过特殊的升级协议（HTTP/1.1 Upgrade 或者 HTTP/2）建立新的 TCP 连接，与传统 HTTP 连接不同。

2. 数据格式
   SSE 可以传输文本和二进制格式的数据，但只支持单向数据流，即只能由服务器向客户端推送数据。
   WebSocket 支持双向数据流，客户端和服务器可以互相发送消息，并且没有消息大小限制。

3. 连接状态

SSE 的连接状态仅有三种：已连接、连接中、已断开。连接状态是由浏览器自动维护的，客户端无法手动关闭或重新打开连接。
而 WebSocket 连接的状态更灵活，可以手动打开、关闭、重连等。

4. 兼容性

SSE 是标准的 Web API，可以在大部分现代浏览器和移动设备上使用。但如果需要兼容老版本的浏览器（如 IE6/7/8），则需要使用 polyfill 库进行兼容。
而 WebSocket 在一些老版本 Android 手机上可能存在兼容性问题，需要使用一些特殊的 API 进行处理。

5. 安全性

SSE 的实现比较简单，都是基于 HTTP 协议的，与普通的 Web 应用没有太大差异，因此风险相对较低。WebSocket 则需要通过额外的安全措施（如 SSL/TLS 加密）来确保数据传输的安全性，避免被窃听和篡改，否则可能会带来安全隐患。

### 适用于场景

1. chatGPT 返回的数据 就是使用的 SSE 技术
2. 实时数据大屏 如果只是需要展示 实时的数据可以使用 SSE 技术 而不是非要使用 webSocket

### API 用法

```js
const Options = {
  withCredentials: true // Boolean 类型，表示是否允许发送 Cookie 和 HTTP 认证信息。默认为 false。
  headers: { // Object 类型，表示请求头。
    'Content-Type': 'application/json' // 设置请求头
  },
  retryInterval:1000 //Number 类型，表示与服务器失去连接后，重新连接的时间间隔。默认为 1000 毫秒。
}
/**
 * @param {string} url - 表示与服务器建立连接的 URL 必填
 * @param { Options } options - 可选参数
 */
const eventSource = new EventSource(url, Options);
```
