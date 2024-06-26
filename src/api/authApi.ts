import {
  IChangePassword,
  INewPost,
  INewUser,
  ISignInUser,
  IUpdatePost,
  IUpdateUser,
} from "@/lib/types";
import axios from "axios";

// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = "https://polaroid-server.onrender.com/api";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        console.log("Refreshing access token...");
        await authApi.post("/user/refresh");
        return authApi(originalRequest);
      }

      return Promise.reject(error);
    }
  }
);

export const signUpUser = async (user: INewUser) => {
  try {
    const response = await authApi.post("/user/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInUser = async (user: ISignInUser) => {
  try {
    const response = await authApi.post("/user/login", user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const response = await authApi.post("/user/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await authApi.get("/user/current");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (user: IUpdateUser) => {
  try {
    const response = await authApi.patchForm("/user/update", user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (data: IChangePassword) => {
  try {
    const response = await authApi.patch("/user/password", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProfile = async () => {
  try {
    const response = await authApi.delete("/user/delete");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPost = async () => {
  try {
    const response = await authApi.get("/post/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingPosts = async () => {
  try {
    console.log("Fetching Trending Posts!");
    const response = await authApi.get("/post/trending");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowingPosts = async () => {
  try {
    console.log("Fetching Following Posts!");
    const response = await authApi.get("/post/following");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPost = async (postId?: string) => {
  try {
    const response = await authApi.post("/post/", { postId: postId });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (post: INewPost) => {
  try {
    const response = await authApi.postForm("/post/create", post);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePost = async (post: IUpdatePost) => {
  try {
    const response = await authApi.patchForm("/post/update", post);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePost = async (post: { _id: string | undefined }) => {
  try {
    const response = await authApi.post("/post/delete", post);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likePost = async (postId: string) => {
  try {
    const response = await authApi.post("/post/like", { postId: postId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const commentPost = async (comment: {
  postId: string;
  content: string;
}) => {
  try {
    const response = await authApi.post("/post/comment", comment);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savePost = async (postId: string) => {
  try {
    const response = await authApi.post("/post/save", { postId: postId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostComments = async (postId?: string) => {
  try {
    const response = await authApi.post("/post/comments", { postId: postId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserProfile = async (userId?: string) => {
  try {
    const response = await authApi.post("/user/profile", { userId: userId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserPosts = async (userId?: string) => {
  try {
    const response = await authApi.post("/post/posts", { userId: userId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserSaves = async (userId?: string) => {
  try {
    const response = await authApi.post("/post/saves", { userId: userId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const followUser = async (userId?: string) => {
  try {
    const response = await authApi.post("/user/follow", { userId: userId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSuggestedUsers = async () => {
  try {
    const response = await authApi.get("/user/suggested");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowingUsers = async () => {
  try {
    const response = await authApi.get("/user/following");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchUsers = async (searchTerm?: string) => {
  try {
    console.log("Fetching Search Users");
    const response = await authApi.post("/user/search", {
      searchTerm: searchTerm,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNotfications = async () => {
  try {
    const response = await authApi.get("/notification/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markNotificationsAsSeen = async () => {
  try {
    console.log("Marking notifications as seen");
    const response = await authApi.patch("/notification/mark-as-seen");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
