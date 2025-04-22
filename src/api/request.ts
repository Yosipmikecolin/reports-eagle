import { RequestTable } from "@/interfaces";
import { axiosConfig } from "./config";

export const getRequest = async () => {
  return (await axiosConfig.get<RequestTable[]>("/requests")).data;
};
