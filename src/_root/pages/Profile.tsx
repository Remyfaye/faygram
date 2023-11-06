import { useUserContext } from "@/context/AuthContext"
import { useGetSavedPost, useGetUserPostById } from "@/lib/react-query/queriesAndMutations"
import { useState } from "react"
// import { Link } from "react-router-dom"


const Profile = () => {

  const [showPost, setShowPost] = useState(true)
  const [showSaved, setShowSaved] = useState(false)
  const {user} = useUserContext()


  const userId = user?.id

  const {data:userPosts, ispending} = useGetUserPostById(userId)
  const {data:savedPosts} = useGetSavedPost()
  console.log(savedPosts)


  // const displaySaved = () => {
  //   setShowSaved(true)

  // }
  return (
    <div className="p-7 ">

      {/* user bio */}
      <div className="flex items-center gap-3 mb-10">

        <img 
            className="rounded-full w-12 lg:h-12"
            alt='creator'
            src={user?.imageUrl || '/assets/icons/profile-placeholder.svg'}/>


        <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1 capitalize">
                    {user?.name}
            </p>

                
            </div>
      </div>

      {/* user saved post */}
      <div>

        <div className="flex gap-2 mt-4">
          <h2 
          onClick={() => 
            (setShowPost(true),
            setShowSaved(false))
          }
          className="bg-dark-4 py-3 px-5 rounded-xl cursor-pointer">
            posts
          </h2>
          <h2 
          onClick={() => (setShowPost(false),
            setShowSaved(true))}

          className="bg-dark-4 py-3 px-5 rounded-xl cursor-pointer">saved posts</h2>
        </div>

        <div>
          {showPost ? (
            <div className="flex flex-wrap gap-5 py-5">
              {userPosts?.documents?.map( (post) => (
                <div className="max-w-2xl h-[200px]">
                  <img src={post?.imageUrl} height={100}
                  className="w-full object-contain  mb-5 rounded-xl grid-post_link"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {savedPosts?.documnets?.map((saved) => (
                <div className="max-w-2xl h-[200px]">
                <img src={saved?.imageUrl} height={100}
                className="w-full object-contain  mb-5 rounded-xl grid-post_link"
                />
              </div>
              ))}
            </div>
          )}

        </div>
        
      </div>
    </div>
  )
}

export default Profile
