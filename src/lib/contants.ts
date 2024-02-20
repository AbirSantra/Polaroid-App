import { Heart, Home, Search, UserRound } from "lucide-react";
import { INavLinkItem } from "./types";

export const navLinkItems: INavLinkItem[] = [
  {
    icon: Home,
    url: "/",
    label: "Home",
  },
  {
    icon: Search,
    url: "/explore",
    label: "Explore",
  },
  {
    icon: Heart,
    url: "/activity",
    label: "Activity",
  },
  {
    icon: UserRound,
    url: "/profile",
    label: "Profile",
  },
];
