// import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations"
import { allUsers } from "@/constants"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"



const AllUsers = () => {

  // const {data:allUsers, isPending} = useGetAllUsers()
  if(!allUsers) {
    return(
      <Loader/>
    )
  }
  return (

    <div>
      <h1 
      className="text-[1.5rem] text-primary-bold m-5
      py-5 text-lg text-light-3">All users</h1>

      <div className="m-5 justify-center flex flex-wrap gap-5">

            
      {allUsers.map((user) => (
        <Link to={`/profile/${user?.id}`}>
        <div className="flex flex-col w-[10rem] gap-3 p-4 rounded-3xl bg-dark-4 
        items-center justify-center">
        <img src={user.creatorImg} width={34} height={34} 
        className="w-8 h-8 rounded-full object-cover"/>

          <h2 className="capitalize">{user.name}</h2>

          </div>
        </Link>
        
      )) }
      </div>
    </div>
    
  )
}

export default AllUsers
