```sh
  openssl genpkey -algorithm RSA -out private-key.pem -aes256
  openssl req -new -key private-key.pem -out certificate.csr
  openssl x509 -req -in certificate.csr -signkey private-key.pem -out certificate.pem
```


### 生成 pem 私钥证书文件
1. openssl genpkey -algorithm RSA -out private-key.pem -aes256
  或
 openssl genpkey -algorithm RSA -out private-key.pem -aes256 -pass pass:123456

openssl: OpenSSL 命令行工具的名称。
genpkey: 生成私钥的命令。
-algorithm RSA: 指定生成 RSA 私钥。
-out private-key.pem: 将生成的私钥保存为 private-key.pem 文件。
-aes256: 为私钥添加 AES 256 位加密，以保护私钥文件不被未经授权的人访问。
Enter PEM pass phrase qwe123 密码短语生成 pem 文件的时候需要
-pass pass:你的密码


### 生成 csr 签名文件
2. openssl req -new -key private-key.pem -out certificate.csr

"req": 表示使用 X.509 证书请求管理器 (Certificate Request Management) 功能模块。
"-new": 表示生成新的证书签名请求。
"-key private-key.pem": 表示使用指定的私钥文件 "private-key.pem" 来加密证书签名请求中的密钥对。
"-out certificate.csr": 表示输出生成的证书签名请求到文件 "certificate.csr" 中。该文件中包含了申请者提供的一些证书请求信息，例如公钥、授权主体的身份信息等。

Country Name (2 letter code) []:CN 国家
State or Province Name (full name) []:BJ 省份
Locality Name (eg, city) []:BJ 城市
Organization Name (eg, company)ZMY 组织或者是个人
Organizational Unit Name (eg, section) []:XMKJ 机构名称
Common Name (eg, fully qualified host name) []:localhost 域名
Email Address []: 邮箱地址
Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []: 密码加盐 XMZSXMZSXMZS (大于4小于20)

### 生成pem数据证书
3. openssl x509 -req -in certificate.csr -signkey private-key.pem -out certificate.pem

"x509": 表示使用 X.509 证书管理器功能模块。
"-req": 表示从输入文件（这里为 "certificate.csr"）中读取证书签名请求数据。
"-in certificate.csr": 指定要读取的证书签名请求文件名。
"-signkey private-key.pem": 指定使用指定的私钥文件 "private-key.pem" 来进行签名操作。一般情况下，签名证书的私钥应该是和之前生成 CSR 的私钥对应的。
"-out certificate.pem": 表示将签名后的证书输出到文件 "certificate.pem" 中。该文件中包含了签名后的证书信息，包括签名算法、有效期、公钥、授权主体的身份信息等。
Enter pass phrase for private-key.pem: 密码短语
