// import { useUserContext } from "@/context/AuthContext"
import { allUsers, homeFeed } from "@/constants"

import { useState } from "react"
import { useParams } from "react-router-dom"
// import { Link } from "react-router-dom"

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements between randomIndex and i
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}

const Profile = () => {

  const {id} = useParams()
 
  const [showPost, setShowPost] = useState(true)
  const [showSaved, setShowSaved] = useState(false)
  // const {user} = useUserContext()

  const user = allUsers.find((user) => user.id === id)

  const shuffledArray = shuffleArray(homeFeed);


  // const displaySaved = () => {
  //   setShowSaved(true)

  // }
  return (
    <div className="p-7 ">

      {/* user bio */}
      <div className="flex items-center gap-3 mb-10">

        <img 
            className="rounded-full w-8 h-8 object-cover lg:h-12"
            alt='creator'
            src={user?.creatorImg || '/assets/icons/profile-placeholder.svg'}/>


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
          {showPost && (
            <div className="flex justify-center flex-wrap gap-5 py-5 ">
              {homeFeed?.map( (post) => (
                <div className="max-w-2xl ">
                  <img src={post?.imageUrl} height={160} width={160}
                  className=" object-contain 
                   rounded-xl "
                  />
                </div>
              ))}
            </div>
          ) }
          {showSaved && (
            <div className="flex justify-center flex-wrap gap-5 py-5 ">
              {shuffledArray?.map( (post) => (
                <div className="max-w-2xl ">
                  <img src={post?.imageUrl} height={160} width={160}
                  className=" object-contain 
                   rounded-xl "
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
