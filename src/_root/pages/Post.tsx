import PageHeader from "@/components/page-header";
import PostDetails, { PostDetailsSkeleton } from "@/components/post-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetPost, useGetPostComments } from "@/lib/tanstack-query/queries";
import { IComment } from "@/lib/types";
import { ArrowLeftIcon } from "lucide-react";
import moment from "moment";

import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id: postId } = useParams();

  const navigate = useNavigate();

  const { data: postData, isPending: isPostLoading } = useGetPost(postId);

  const { data: comments, isPending: isCommentsLoading } =
    useGetPostComments(postId);

  return (
    <div className="flex h-full min-h-dvh flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="flex w-full items-center gap-4">
        <ArrowLeftIcon
          className="cursor-pointer text-rose-500"
          onClick={() => navigate(-1)}
        />
        <PageHeader title="Post" />
      </div>

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
                    <p className="text-sm font-semibold text-gray-900">
                      {comment.user.username}
                    </p>
                    <p className="text-xs text-gray-400">{commentedAt}</p>
                  </div>
                  <p className="text-sm text-gray-900">{comment.content}</p>
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
