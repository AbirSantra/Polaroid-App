import { IApiResponse, INewUser } from "@/lib/types";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const signUpUser = async (user: INewUser): Promise<IApiResponse> => {
  const response = await authApi.post("/user/register", user);
  return response.data;
};
