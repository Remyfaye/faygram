import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"



const AllUsers = () => {

  const {data:allUsers, isPending} = useGetAllUsers()
  if(isPending) {
    return(
      <Loader/>
    )
  }
  return (
    <div className="m-5  flex flex-wrap gap-5">
      
      {allUsers?.documents.map((user) => (
        <Link to={`/profile/${user?.$id}`}>
        <div className="flex flex-col gap-3 p-4 rounded-3xl bg-dark-4 items-center justify-center">
        <img src={user.imageUrl} width={34} height={34} className="rounded-full"/>

          {user.name}

          </div>
        </Link>
        
      )) }
    </div>
  )
}

export default AllUsers
