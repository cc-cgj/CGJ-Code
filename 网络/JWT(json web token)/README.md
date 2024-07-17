### jwt(json web token)

主要是做鉴权用的登录之后存储用户信息
下面这段就是生成的 token(令牌)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3Njc0NDkyLCJleHAiOjE2ODc3NjA4OTJ9.Y6eFGv4KXqUhlRHglGCESvcJEnyMkMwM1WfICt8xYC4

JWT 是三部分组成的

1. 头部（Header）：头部通常由两部分组成：令牌的类型（即 "JWT"）和所使用的签名算法。头部通常采用 JSON 对象表示，并进行 Base64 URL 编码。

```json
{
  "alg": "HS256", //算法 RSA(HS256)非对称加密算法
  "typ": "JWT"
}
```

alg：代表所使用的签名算法，例如 HMAC SHA256（HS256）或 RSA 等。
typ：代表令牌的类型，一般为 "JWT"。

2. 负载（Payload）：负载包含所要传输的信息，例如用户的身份、权限等。负载也是一个 JSON 对象，同样进行 Base64 URL 编码。

```json
{
  "iss": "example.com",
  "exp": 1624645200,
  "sub": "1234567890",
  "username": "johndoe"
}
```

iss：令牌颁发者（Issuer），代表该 JWT 的签发者。
exp：过期时间（Expiration Time），代表该 JWT 的过期时间，以 Unix 时间戳表示。
sub：主题（Subject），代表该 JWT 所面向的用户（一般是用户的唯一标识）。
自定义声明：可以添加除了预定义声明之外的任意其他声明。

3. 签名（Signature）：签名是使用私钥对头部和负载进行加密的结果。它用于验证令牌的完整性和真实性。

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secretKey);
```
