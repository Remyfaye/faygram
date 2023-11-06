import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignUpForm = () => {
  const {toast} = useToast()
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext()
  const navigate = useNavigate()

  const {mutateAsync: createUserAccount, isLoading:isCreatingAccount} = useCreateUserAccountMutation()
  const {mutateAsync: signInAccount, isLoading:isSigningIn} = useSignInAccount()

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:"",

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
      const newUser = await createUserAccount(values)
      console.log(newUser)
      if(!newUser){
        return toast({
          title: "sign up failed. please try again",
        })
      }
  
      const session = await signInAccount({
        email: values.email,
        password:values.password
      })
  
      if(!session) {
        return toast({title:'sign in failed. please try again'})
      }
  
      const isLoggedIn = await checkAuthUser()
  
      if(isLoggedIn){
        form.reset()
        navigate('/')
      }else{return toast({title:'sign up failed. please try again'})}
    
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

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
          {isCreatingAccount ? 
          <div className="flex-center gap-2">
            <Loader/> Loading...
          </div> : 'sign up'}
        </Button>

        <p className="text-small-regular text-light-2 text-center">
            Already have an account?
            <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
        </p>

        </form>

      </div>

    
    </Form>
  )
}

export default SignUpForm
