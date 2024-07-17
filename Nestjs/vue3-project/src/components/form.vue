<template>
  <div>
    <el-form
      :label-position="labelPosition"
      model="right"
      label-width="100px"
      style="width: 600px"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.code" style="flex: 1" />
        <img :src="codeUrl" alt="" @click="resetCode" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormProps } from "element-plus";

const labelPosition = ref<FormProps["labelPosition"]>("right");

const formLabelAlign = reactive({
  name: "",
  password: "",
  code: "",
});

const codeUrl = ref<string>("/api/user/code");
const resetCode = () => {
  codeUrl.value = "/api/user/code?" + Math.random();
};

const submit = () => {
  fetch("/api/user/create", {
    method: "post",
    body: JSON.stringify(formLabelAlign),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
</script>
<style scoped></style>
