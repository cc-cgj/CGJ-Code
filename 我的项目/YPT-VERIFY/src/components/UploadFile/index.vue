<template>
  <a-upload
    v-model:fileList="fileList"
    :accept="accept"
    :max-count="maxCount"
    :custom-request="upload"
    :before-upload="beforeUpload"
    @remove="handleRemoveFile"
  >
    <a-flex align="center" :gap="12">
      <a-button style="min-width: 212px">
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
      <div style="font-size: 12px; color: #777a7f" @click.stop>
        仅支持doc/docx/pdf/xls/xlsx格式，最多10个文件
      </div>
    </a-flex>
  </a-upload>
</template>

<script name="UploadFile" setup lang="ts">
import axios from "axios";
import { Upload } from "ant-design-vue";
import { withDefaults } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type {
  UploadChangeParam,
  UploadProps,
  UploadFile,
} from "ant-design-vue";

import { uploadFile } from "@/apis/index";
import {
  toBase64,
  validateFileSize,
  validateFileAccept,
  getFileExtension,
  validateFileMax,
} from "@/utils/file";

const CancelToken = axios.CancelToken;

interface TypeProps {
  modelValue: {
    attachId: string;
  }[];
  accept?: string;
  maxCount?: number;
}

const props = withDefaults(defineProps<TypeProps>(), {
  modelValue: () => [],
  accept: ".doc,.docx,.pdf,.xls,.xlsx",
  maxCount: 10,
});

const emits = defineEmits(["update:modelValue"]);

type FileListItem = UploadFile<{
  cancel?: (message?: string) => void;
  bean?: {
    attachId: string;
  }[];
}>;

const fileList = ref<FileListItem[]>([]);

// 会过滤 0kb的文件
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const size = file.size;
  let validate: boolean | string = true;
  const fileType = getFileExtension(file.name);
  if (!(size && validateFileSize(size))) {
    validate = Upload.LIST_IGNORE;
  }
  if (!validateFileAccept(fileType as string, props.accept)) {
    validate = Upload.LIST_IGNORE;
  }

  if (!validateFileMax(fileList.value.length + 1, props.maxCount)) {
    validate = Upload.LIST_IGNORE;
  }
  return validate;
};

async function upload() {
  const file = fileList.value?.at(-1);
  if (!file) return;
  const fileType = getFileExtension(file.name);

  try {
    // const base64Str = await toBase64(
    //   file.originFileObj as UploadFile["originFileObj"]
    // );
    const formData = new FormData();
    const base64Str = file.originFileObj;
    formData.append("base64Str", base64Str as Blob);
    const result = await uploadFile(
      {
        // base64Str: file.originFileObj,
        file: file.originFileObj as File,
        fileType: fileType as string,
        attachFileName: file.name as string,
      },
      {
        cancelToken: new CancelToken(function executor(c) {
          file.xhr = {
            cancel: c,
          };
        }),
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress(progressEvent) {
          if (progressEvent.total) {
            const progress = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            file.percent = progress;
          }
        },
      }
    );

    const data = result.bean;
    const newValue = props.modelValue.slice();
    emits("update:modelValue", newValue.concat(data));
    file.response = result;
    file.status = "done";
  } catch (err) {
    file.status = "error";
    console.log(`上传失败`, err);
  }
}

function handleRemoveFile(file: FileListItem) {
  const { response, xhr } = file;
  if (response) {
    const newValue = props.modelValue.slice();
    const attachId = response.bean?.[0].attachId;
    const index = newValue.findIndex((item) => item.attachId == attachId);
    newValue.splice(index, 1);
    emits("update:modelValue", newValue);
  } else {
    xhr?.cancel?.("文件已取消上传");
  }
}
</script>

<style scoped></style>
