import { API_BASE_URL } from "./hostSetting";

const baseUrl = API_BASE_URL;


export const endpoints = {
  hostUrl: baseUrl,
  loginUrl: `${baseUrl}/auth/login`,
  registerUrl: `${baseUrl}/auth/register`,
  prescriptionList: `${baseUrl}/prescription/list`,
  customerList: `${baseUrl}/customer/list`,
  };