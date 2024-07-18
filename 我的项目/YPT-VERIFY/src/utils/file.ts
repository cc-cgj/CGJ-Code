import { message } from "ant-design-vue";
import type { UploadFile } from "ant-design-vue";
export const toBase64 = (file: File | UploadFile["originFileObj"]) =>
  new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    }
  });

export function getFileExtension(filename: string) {
  const regex = /\.[0-9a-z]+$/i;
  const match = filename.match(regex);
  return match ? match[0].replace(".", "") : null;
}
/**
 *
 * @param extension 文件后缀名
 * @param accept 可上传的文件格式
 * @returns boolean
 */

export const validateFileAccept = (
  extension: string,
  accept: string
): boolean => {
  const validate = accept.includes(extension);
  console.log(`validate`, validate);

  if (!validate) {
    message.error(`请上传${accept}格式的文件`);
  }
  return validate;
};

/**
 *
 * @param size 文件大小
 * @param max 最大可上传文件大小，单位为字节
 * @returns boolean
 */
export const validateFileSize = (
  size: number,
  max: number = 40 * 1024 * 1024
): boolean => {
  const validate = max >= size;
  if (!validate) {
    message.error(`限制文件不超过${max / (1024 * 1024)}M`);
  }
  return validate;
};

/**
 *
 * @param fileNumber 文件数量
 * @param max 最大可上传文件数量
 * @returns boolean
 */
export const validateFileMax = (fileNumber: number, max: number): boolean => {
  const validate = max >= fileNumber;

  if (!validate) {
    message.error(`文件上传已达最大上传数量,最多${max}个文件`);
  }
  return validate;
};
