import axios from "axios";

axios.defaults.baseURL = "/api";

export const addUser = (data: any) => axios.post("/curd", data).then((res) => res.data);

export const getList = (data: any) => axios.get("/curd", { params: data }).then((res) => res.data);

export const delUser = (data: any) => axios.delete(`/curd/${data.id}`).then((res) => res.data);

export const updateUser = (data: any) =>
  axios.patch(`/curd/${data.id}`, data).then((res) => res.data);

//添加tag
export const addTags = (data: any) => axios.post(`/curd/add/tags`, data).then((res) => res.data);
