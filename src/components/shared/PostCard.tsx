
// import {useState} from 'react'
import { useUserContext } from "@/context/AuthContext"
// import { formatDateString } from "@/lib/utils"
// import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import Loader from './Loader'


type postCardProps = {
    post:any
}

const PostCard = ({post}: postCardProps) => {
    const {user} = useUserContext()
    console.log(post)
    // const [noPostYet, setNoPostYet] = useState('')
    // const navigate = useNavigate()

    if(!post) {
        return <Loader/>
    }

  return (
    <div className="post-card">


        <div className="flex items-center gap-3">

            {/* the person */}
            <Link to={`/profile/${post.id}`}>
                <img 
                className="rounded-full w-12 lg:h-12"
                alt='creator'
                src={post?.creatorImg || '/assets/icons/profile-placeholder.svg'}/>

            </Link>

            <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1 capitalize">
                    {post?.creator}
                </p>

                <div className="flex-center gap-2 text-light-3 justify-evenly ">
                    <p className="subtle-semibold lg:small-regular text-left">
                        {/* {formatDateString(post?.$createdAt)} */}
                        {post.date}
                    </p >
                    -
                    <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                </div>
            </div>
        </div>

        <div 
        className={`${user?.id !== post?.creator?.$id && 'hidden'}`}
        >
            <img
        src={"/assets/icons/edit.svg"} alt="edit" width={20} height={20}
            className="mt-5"
            />
        </div>

        <Link to={`/posts/${post?.id}`}>
            <div className="smal-medium lg:base-medium py-5">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2">
                    {post?.tags?.map((tag:string, index: string) => (
                        <li className="text-light-3" key={`${tag}${index}`}>
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>

            
               
                <img 
            className="post-card_img"
            
            alt="pimg"
            src={post?.imageUrl || '/assets/icons/profile-placeholder.svg'} />

            

            
        </Link>

        <PostStats post={post} />
    </div>
  )
}

export default PostCard
