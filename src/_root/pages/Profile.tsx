import PostCard, { PostCardSkeleton } from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserPosts,
  useGetUserProfile,
  useGetUserSaves,
} from "@/lib/tanstack-query/queries";
import { IPost, IProfile, IUser } from "@/lib/types";
import { checkFollowStatus } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: profile, isPending: isProfileLoading } = useGetUserProfile(id);

  return (
    <div className="flex h-full min-h-screen flex-1 flex-col p-4 md:p-8">
      {profile || !isProfileLoading ? (
        <ProfileInfo profileData={profile.data} currentUser={user} />
      ) : null}
    </div>
  );
};

export default Profile;

export const ProfileInfo = ({
  profileData,
  currentUser,
}: {
  profileData: IProfile;
  currentUser: IUser;
}) => {
  const isCurrentUser = currentUser._id === profileData._id;

  const [isFollowing, setIsFollowing] = useState<boolean>(
    checkFollowStatus({ profile: profileData, userId: currentUser._id })
  );

  const [feedType, setFeedType] = useState<"POSTS" | "SAVES">("POSTS");

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between">
        <Avatar className="h-24 w-24 border border-gray-300">
          <AvatarImage src={profileData.avatar} />
          <AvatarFallback>
            {profileData.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isCurrentUser && (
          <Button
            variant={"outline"}
            className="w-fit font-semibold text-gray-500"
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-semibold">{profileData.fullName}</p>
        <p className="text-rose-500">@{profileData.username}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>
          <span className="font-semibold">{profileData.followersCount}</span>{" "}
          followers
        </p>
        <p>
          <span className="font-semibold">{profileData.followingsCount}</span>{" "}
          following
        </p>
      </div>
      <p className="whitespace-pre-wrap">{profileData.bio}</p>
      {!isCurrentUser && (
        <div>
          {isFollowing ? (
            <Button variant={"outline"}>Unfollow</Button>
          ) : (
            <Button variant={"primary"}>Follow</Button>
          )}
        </div>
      )}

      {isCurrentUser && (
        <div className="flex w-full gap-2">
          <Button
            variant={"outline"}
            className={
              feedType === "POSTS"
                ? "border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                : "text-gray-500 hover:bg-rose-50 hover:text-rose-600"
            }
            onClick={() => setFeedType("POSTS")}
          >
            Posts
          </Button>
          <Button
            variant={"outline"}
            className={
              feedType === "SAVES"
                ? "border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                : "text-gray-500 hover:bg-rose-50 hover:text-rose-600"
            }
            onClick={() => setFeedType("SAVES")}
          >
            Saved
          </Button>
        </div>
      )}

      {feedType === "POSTS" && <PostsFeed profileData={profileData} />}
      {feedType === "SAVES" && <SavesFeed profileData={profileData} />}
    </div>
  );
};

export const PostsFeed = ({ profileData }: { profileData: IProfile }) => {
  const { data: posts, isPending: isPostsLoading } = useGetUserPosts(
    profileData._id
  );

  return (
    <div>
      {isPostsLoading || !posts.data.length ? (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          {posts.data.map((post: IPost) => (
            <PostCard key={post._id} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export const SavesFeed = ({ profileData }: { profileData: IProfile }) => {
  const { data: saves, isPending: isSavesLoading } = useGetUserSaves(
    profileData._id
  );

  return (
    <div>
      {isSavesLoading || !saves.data.length ? (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          {saves.data.map((post: IPost) => (
            <PostCard key={post._id} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
};
