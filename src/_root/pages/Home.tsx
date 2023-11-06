import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard"
import { useGetResentPost } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"


const Home = () => {
  const {data: posts, isPending: isPostLoading} = useGetResentPost()
  return (
    <div className="flex flex-1">

      <div className="home-container">

        <div className="home-posts">

          <h2 className="h3-bold capitalize w-full">home feed</h2>

          {isPostLoading && !posts ? (
            <Loader/>
          ) : (
            <ul className="flex flex-col ">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} />
                // <>ll</>
              ))}
            </ul>
          )}
        </div>

      </div>

    </div>
  )
}

export default Home
