import { IApiResponse, INewUser, ISignInUser } from "@/lib/types";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const signUpUser = async (user: INewUser): Promise<IApiResponse> => {
  try {
    const response = await authApi.post("/user/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInUser = async (user: ISignInUser): Promise<IApiResponse> => {
  try {
    const response = await authApi.post("/user/login", user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<IApiResponse> => {
  try {
    const response = await authApi.get("/user/current");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
