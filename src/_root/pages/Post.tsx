import PostDetails, { PostDetailsSkeleton } from "@/components/post-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetPost, useGetPostComments } from "@/lib/tanstack-query/queries";
import { IComment } from "@/lib/types";
import moment from "moment";
import { useEffect } from "react";

import { useParams } from "react-router-dom";

const Post = () => {
  const { id: postId } = useParams();

  const { data: postData, isPending: isPostLoading } = useGetPost(postId);

  const { data: comments, isPending: isCommentsLoading } =
    useGetPostComments(postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-full min-h-dvh flex-1 flex-col gap-8 p-4 md:p-8">
      {postData || !isPostLoading ? (
        <PostDetails postData={postData} />
      ) : (
        <PostDetailsSkeleton />
      )}

      {comments || !isCommentsLoading ? (
        <div className="flex w-full flex-col space-y-6">
          <p className="text-sm font-semibold text-gray-900">
            Comments ({comments.data.length})
          </p>
          {comments.data.map((comment: IComment) => {
            const commentedAt = moment(comment.createdAt).fromNow(true);
            return (
              <div className="flex w-full gap-4" key={comment._id}>
                <Avatar className="h-10 w-10 border border-gray-300">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>
                    {comment.user.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <p className="text-xs font-semibold text-gray-900 sm:text-sm">
                      {comment.user.username}
                    </p>
                    <p className="text-xs text-gray-400">{commentedAt}</p>
                  </div>
                  <p className="text-xs text-gray-900 sm:text-sm">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Post;
