import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"



const Topbar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate()
    const {user} = useUserContext()

    useEffect(() => {
        if(isSuccess) navigate(0)

    }, [isSuccess])
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to='/'>
            <div className="flex  gap-2  items-center">
                <img 
                className="w-10 h-10"
                src="/assets/images/logo.png"
                alt="logo"
                />

                <h2 className="font-bold text-2xl">FayGram</h2>
            </div>
        </Link>

        <div className="flex gap-4 items-center">
            <Button variant='ghost' className="shad-button_ghost"
             onClick={() => signOut()}
            >
                <img src="/assets/icons/logout.svg" alt='logo'/>
            </Button>

            {/* <Link to={`/profile/${user.id}`} className="flex">
                <div className="w-8 h-8 rounded-full bg-slate-400">
                    <h2 className="text-white">
                        {user.name}
                    </h2>
                </div>
            </Link> */}

            
        <Link to={`/profile/${user.id}`} className="flex">
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt="prf"
          className="h-10 w-10 rounded-full"/>
        </Link>
        </div>
      </div>
    </section >
  )
}

export default Topbar
