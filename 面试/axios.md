### axios 默认发送请求是不携带 cookie 的，需要携带 cookie，需要设置 withCredentials: true

```js
import axios from 'axios'
axios.defaults.withCredentials = true;
```
