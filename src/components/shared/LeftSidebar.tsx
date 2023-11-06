import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"
import { sidebarLinks } from "@/constants"
import { INavLink } from "@/types"



const LeftSidebar = () => {
  const {pathname} = useLocation()
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate()
    const {user} = useUserContext()

    useEffect(() => {
        if(isSuccess) navigate(0)

    }, [isSuccess])
  return (
    <nav className="leftsidebar">

      <div className="flex flex-col gap-11">
        <Link to='/' className="flex gap-3">
            <div className="flex  gap-2  items-center">
                <img 
                className="w-10 h-10"
                width={170}
                height={36}
                src="/assets/images/logo.png"
                alt="logo"
                />

                <h2 className="font-bold text-2xl">FayGram</h2>
            </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center mt-[-15px]">

          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt="prf"
          className="h-10 w-10 rounded-full"/>

          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link:INavLink) => {
            const isActive = pathname === link.route
            return(
              <li key={link.label} 
              className={isActive ? 'bg-primary-500 rounded-xl' : 'leftsidebar-link group'}>
                
                <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                  <img src={link.imgURL} alt='sideIcons' 
                  className={`group-hover:invert-white ${isActive && 'invert-white'}`} />

                  {link.label}

                </NavLink>

              </li>
              
            )
          })}
        </ul>

        <Button variant='ghost' className="shad-button_ghost mb-[2rem]"
             onClick={() => signOut()}
            >
              <img src="/assets/icons/logout.svg" alt='logo'/>
              <p className="samall-medium lg:base-medium mt-">Logout</p>
      </Button>
       
      </div>

      
    </nav>
  )
}

export default LeftSidebar
