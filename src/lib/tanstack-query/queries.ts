import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IChangePassword,
  INewPost,
  INewUser,
  ISignInUser,
  IUpdatePost,
  IUpdateUser,
} from "../types";
import {
  changePassword,
  commentPost,
  createPost,
  deletePost,
  deleteProfile,
  followUser,
  getAllPost,
  getFollowingPosts,
  getFollowingUsers,
  getPost,
  getPostComments,
  getSuggestedUsers,
  getTrendingPosts,
  getUserPosts,
  getUserProfile,
  getUserSaves,
  likePost,
  savePost,
  signInUser,
  signOutUser,
  signUpUser,
  updatePost,
  updateUser,
} from "@/api/authApi";

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => signUpUser(user),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: ISignInUser) => signInUser(user),
  });
};

export const useSignOutUser = () => {
  return useMutation({
    mutationFn: () => signOutUser(),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: IChangePassword) => changePassword(data),
  });
};

export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: () => deleteProfile(),
  });
};

export const useGetUserProfile = (postId?: string) => {
  return useQuery({
    queryKey: ["GET_PROFILE", postId],
    queryFn: () => getUserProfile(postId),
    enabled: !!postId,
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["ALL_POSTS"],
    queryFn: () => getAllPost(),
  });
};

export const useGetTrendingPosts = () => {
  return useQuery({
    queryKey: ["TRENDING_POSTS"],
    queryFn: () => getTrendingPosts(),
  });
};

export const useGetFollowingPosts = () => {
  return useQuery({
    queryKey: ["FOLLOWING_POSTS"],
    queryFn: () => getFollowingPosts(),
  });
};

export const useGetPost = (postId?: string) => {
  return useQuery({
    queryKey: ["GET_POST", postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TRENDING_POSTS"],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TRENDING_POSTS"],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: { _id: string | undefined }) => deletePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TRENDING_POSTS"],
      });
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => savePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SAVES"],
      });
    },
  });
};

export const useCommentPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: { postId: string; content: string }) =>
      commentPost(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_COMMENTS"],
      });
    },
  });
};

export const useGetPostComments = (postId?: string) => {
  return useQuery({
    queryKey: ["GET_COMMENTS", postId],
    queryFn: () => getPostComments(postId),
    enabled: !!postId,
  });
};

export const useGetUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: ["GET_POSTS", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserSaves = (userId?: string) => {
  return useQuery({
    queryKey: ["GET_SAVES", userId],
    queryFn: () => getUserSaves(userId),
    enabled: !!userId,
  });
};

export const useGetSuggestedUsers = () => {
  return useQuery({
    queryKey: ["GET_SUGGESTED_USERS"],
    queryFn: () => getSuggestedUsers(),
  });
};

export const useGetFollowingUsers = () => {
  return useQuery({
    queryKey: ["GET_FOLLOWING_USERS"],
    queryFn: () => getFollowingUsers(),
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FOLLOWING_POSTS"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_SUGGESTED_USERS"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_FOLLOWING_USERS"],
      });
    },
  });
};
