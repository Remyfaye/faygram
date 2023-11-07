import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignInValidation } from "@/lib/validation"
// import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
// import { useUserContext } from "@/context/AuthContext"


const SignInForm = () => {
  const {toast} = useToast()
  // const {checkAuthUser, isLoading:isUserLoading} = useUserContext()
  const navigate = useNavigate()

 
  const {mutateAsync: signInAccount} = useSignInAccount()

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email:"",
      password:"",

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
      
      const session = await signInAccount({
        // name:values.name,
        email: values.email,
        password:values.password
      })
  
      if(!session) {
        toast({title:'welcome'})
        return navigate('/#home')
      }
  
      // const isLoggedIn = await checkAuthUser()
      const isLoggedIn = true
  
      if(isLoggedIn){
        form.reset()
        navigate('/#home')
        toast({title:'welcome back'})
      }else{return toast({title:'sign in failed. please try again'})}
    
  }
  
  
  return (
    <Form {...form}>

      <div className="sm:w-420 flex items-center flex-col justify-center h-full">
        
        <div className="flex  gap-2  items-center">
        <img 
        className="w-10 h-10"
        src="/assets/images/logo.png"/>

        <h2 className="font-bold text-2xl">FayGram</h2>
        </div>
      
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use faygram, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-5 w-full mt-9 ">
        

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          
          <div className="flex-center gap-2">
            log in
          </div> 
        </Button>

        <p className="text-small-regular text-light-2 text-center">
            Don't have an account?
            <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">
              sign up
            </Link>
        </p>

        </form>

      </div>

    
    </Form>
  )
}

export default SignInForm
