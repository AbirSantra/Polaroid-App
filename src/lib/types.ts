import { LucideIcon } from "lucide-react";
export interface INavLinkItem {
  icon: LucideIcon;
  url: string;
  label: string;
}

export interface INewUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface ISignInUser {
  email: string;
  password: string;
}

export interface IUser {
  avatar: string;
  email: string;
  fullName: string;
  username: string;
  _id: string;
  bio: string;
}

export interface IUpdateUser {
  email: string;
  username: string;
  fullName: string;
  bio: string;
  file: File;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface INewPost {
  content: string;
  file?: File;
}
