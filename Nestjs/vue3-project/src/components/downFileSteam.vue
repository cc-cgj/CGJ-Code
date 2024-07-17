<template>
  <div>
    <el-button type="primary" @click="download" size="large">下载</el-button>
  </div>
</template>

<script setup lang="ts">
// axios responseType: 'ArrayBuffer'|'Blob'
const useFetchStream = async (httpUrl: string) => {
  const response = await fetch(httpUrl);
  const contentDisposition = response.headers.get("Content-Disposition");
  const filenameRegex = /filename=([^;]+)/;
  const match = filenameRegex.exec(contentDisposition as string);
  if (match) {
    const filename = match[1];
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    console.log(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.zip`;
    a.click();
  }
};

const download = () => {
  useFetchStream("http://localhost:3000/upload/stream/1717728545794.png");
  // window.open("http://localhost:3000/upload/export/1717728545794.png");
};
</script>

<style scoped></style>
