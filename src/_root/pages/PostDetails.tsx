import { useParams, Link, useNavigate } from "react-router-dom";


import {
  // useDeletePost,
  useGetPostById
} from "@/lib/react-query/queriesAndMutations";
// import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
// import { formatDateString } from "@/lib/utils";
import { Loader } from "lucide-react";
// import PostStats from "@/components/shared/PostStats";
import { homeFeed } from "@/constants";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const safeString = id || 'default value';

  const { data: post } = useGetPostById(safeString);
  // const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPost(
  //   post?.creator.$id
  // );
  // const { mutate: deletePost } = useDeletePost();

   
  const targetObject = homeFeed.find((obj) => obj.id === safeString);
  console.log(targetObject)

  // const relatedPosts = userPosts?.documents.filter(
  //   (userPosts) => userPost.$id !== id
  // );

  // const handleDeletePost = () => {
  //   deletePost({ postId: id, imageId: post?.imageId });
  //   navigate(-1);
  // };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {!targetObject ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={targetObject?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    targetObject?.creatorImg ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {targetObject?.creator}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {/* {formatDateString(post?.$createdAt)} */}
                      {targetObject.date}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {targetObject?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                {/* <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`post_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button> */}
                
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{targetObject?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              {/* <PostStats targetObject={post} userId={user.id} /> */}
            </div>
          </div>
        </div>
      )}

      {/* <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          // <GridPostList posts={relatedPosts} />
          <></>
        )}
      </div> */}

    </div>
  );
};

export default PostDetails;