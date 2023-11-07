
import {Routes, Route} from 'react-router-dom'
import './global.css'
import SignInForm from './_auth/forms/SignInForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'


const App = () => {
  return (
    <main className='flex '>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout/>}>
          <Route index element={<SignInForm/>}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
        </Route>
      

        {/* private route */}
        <Route element={<RootLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/explore' element={<Explore/>} />
          <Route path='/saved' element={<Saved/>} />
          <Route path='/all-users' element={<AllUsers/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/update-post/:id' element={<EditPost/>} />
          <Route path='/posts/:id' element={<PostDetails/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/update-profile/:id' element={<UpdateProfile/>} />
        </Route>

      </Routes>

      <Toaster/>
    </main >
  )
}

export default App
