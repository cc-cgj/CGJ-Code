import request from "./request";
import type { RequestConfig } from "./request";

export const loading = ref(false);

export const loadingMessage = ref();

// 核实信息保存接口
export const saveCompanyInfo = (data: any, config?: RequestConfig) =>
  request.post(`company/score/qualitycompany/saveCompanyInfo.do`, data, {
    ...config,
    messageConfig: {
      success: {
        duration: 10,
        content: "提交成功，请等待审核!",
      },
    },
  });

// 文件上传
export const uploadFile = (
  data: {
    // base64Str: Blob;
    fileType: string;
    attachFileName: string;
    userId?: string;
    file: File;
  },
  config?: RequestConfig
): Promise<{
  bean: any[];
}> => {
  // document.cookie = "JSESSIONID=98891F2C48D400CC8DCF1D1494A3A5EA";
  const formData = new FormData();
  formData.append("file", data.file);
  // formData.append("base64Str", data.base64Str);
  formData.append("fileType", data.fileType);
  formData.append("attachFileName", data.attachFileName);
  formData.append("userId", data.userId || "");
  return request.post<{
    bean: any[];
  }>(`company/score/attachsave/uploadFile.do`, formData, {
    ...config,
    hideLoading: true,
    hideMessage: true,
    timeout: 10 * 60 * 1000, //十分钟
  });
};
