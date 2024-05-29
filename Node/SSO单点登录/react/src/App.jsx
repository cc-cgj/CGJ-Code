import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const token = location.search.split("=")[1];
  // 登录成功之后后端重定向的时候会携带token
  if (!token) {
    // 一进来就调用登录接口
    // 传递应用id,让sso系统知道从哪个应用来的
    fetch(`http://localhost:3000/login?appId=9LQ8Y3mB`).then((res) => {
      location.href = res.url;
    });
  } else {
    // localStorage.setItem('token',token)
  }

  return (
    <>
      <h1>小甲科技 React</h1>
    </>
  );
}

export default App;
