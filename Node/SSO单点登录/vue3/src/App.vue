<template>
  <div>
    <h1>小甲教育 Vue3</h1>
  </div>
</template>

<script setup>
const token = location.search.split("=")[1];
// 登录成功之后后端重定向的时候会携带token
if (!token) {
  // 一进来就调用登录接口
  // 传递应用id,让sso系统知道从哪个应用来的
  fetch("http://localhost:3000/login?appId=Rs6s2aHi").then((res) => {
    location.href = res.url;
  });
} else {
  // localStorage.setItem('token',token)
}
</script>
