
import {Outlet, Navigate} from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/'/>
      ) : (
          <> <section className='flex flex-1 xl:mt-[2rem] justify-center items-center mt-[5rem]
           py-10'>
            <Outlet/>
            </section> 

            <img 
            src='/assets/images/img-2.jpg'
            alt='logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            />
           
            
          </>
      )}
    </>
  )
}

export default AuthLayout
