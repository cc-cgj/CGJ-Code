### HTTPS

HTTPS，全称为 Hypertext Transfer Protocol Secure，是一种通过加密通道传输数据的安全协议。它是 HTTP 协议的安全版本，用于在 Web 浏览器和 Web 服务器之间进行安全的数据传输。HTTPS 在传输过程中使用了 SSL（Secure Sockets Layer）或 TLS（Transport Layer Security）协议来加密数据，确保敏感信息在传输过程中不会被窃取或篡改。

### http 缺点

通信使用明文(不加密)，内容可能会被盗用
不验证通信方的身份，因此有可能遭遇伪装
无法证明报文的完整性，所以有可能已遭篡改

### https

信息加密

完整性校验

身份验证

HTTPS = http + TLS/SSL

### TLS SSL

TLS（Transport Layer Security）和 SSL（Secure Sockets Layer）是用于保护网络通信的安全协议。它们都提供了加密和认证机制，用于确保数据传输的机密性和完整性。
SSL 是最早的安全协议，而 TLS 是在 SSL 的基础上发展起来的。目前广泛使用的版本是 TLS 1.2 和 TLS 1.3。TLS 1.3 是最新的协议版本，在安全性、性能和功能方面有一些改进。
TLS 和 SSL 主要用于以下两个方面：

加密通信：TLS/SSL 使用加密算法来对数据进行加密，防止第三方截获和窃听通信内容。它可以确保数据在传输过程中的隐私性。
身份认证：TLS/SSL 还提供了身份验证机制，用于确认通信双方的身份，并确保数据只发送到正确的接收方。这可以防止恶意用户冒充其他用户或服务器。

SSL 是最早的用来做 https
TLS 是 SSL 升级版 提高了安全性 并解决了 SSL 存在的一些安全性问题
SSl/TLS 工作原理类似的
HTTP + TLS/SSL 安全层 TCP (传输层的上面 应用层的下面)

### 加密

1. 对称加密
   常见的算法有 AES DES 加密
   如：
   A -> B 吃面 密钥：今生永相随
   A: AES 算法 + 密钥（今生永相随）+明文（吃面） = XMZSXMZS==
   B: 使用 AES + 密钥（今生永相随）+密文（ XMZSXMZS==） = 吃面

2. 非对称加密
   常见算法有 RSA(HS256) DSA 加密
   如：
   A -> B 吃面 密钥：今生永相随

   A：RSA + 公钥 + 明文（吃面） = XMZS==
   B：RSA + 私钥 + 密文（XMZS==） = 吃面

3. 散列函数

TLS 是把上述三种加密方式混合在一起的，所以 TLS 也是非常安全的。

### openSSL 生成私钥

openSSL 安装
Mac 电脑自带了
windows www.openssl.org/source/

## 在 SSL/TLS 加密通信中，一般需要使用三个文件来完成证书相关操作，即：

1. 私钥文件（例如 "private-key.pem"），用于对加密数据进行解密操作。
2. 证书签名请求文件（例如 "certificate.csr"），用于向 CA 申请 SSL/TLS 证书签名。
3. SSL/TLS 证书文件（例如 "certificate.pem"），用于对客户端发送的请求进行验证，以确保通信安全可靠。

私钥文件用于对数据进行解密操作，保证了通信的机密性；
证书签名请求文件包含了请求者的身份信息和公钥等信息，需要被发送给 CA 进行签名，从而获取有效的 SSL/TLS 证书；
SSL/TLS 证书文件则包含了签名后的证书信息，被用于客户端和服务器之间的身份验证，以确保通信的安全性和可靠性。
通过使用这三个文件进行密钥交换和身份验证，SSL/TLS 可以实现加密通信以及抵御可能的中间人攻击，提高了通信的安全性和保密性。

### openssl 的 shell 脚本

[text](OPENSSL.md)

### nginx 配置 https

终极大坑 如果在 windows 使用 nginx 配置 https 私钥不能设置密码

```sh
openssl genrsa -out nginx.key 2048 （生成私钥）
openssl req -new -key nginx.key -out nginx.csr（生成签名文件）
openssl x509 -req -in nginx.csr -signkey nginx.key -out nginx.crt（生成证书）
```

```nginx.conf
   server {
       listen       443 ssl;
       server_name  localhost;

       ssl_certificate      nginx.crt;
       ssl_certificate_key  nginx.key;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

       location / {
           root   html;
           index  index.html index.htm;
       }
    }
```
