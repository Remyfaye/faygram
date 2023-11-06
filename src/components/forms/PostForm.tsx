
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/fileUploader"
import { Button } from "../ui/button"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { updatePost } from "@/lib/appwrite/api"

type PostFormProps = {
    post?: Models.Document,
    action: 'Create' | 'update'
}

const PostForm = ({post,action}: PostFormProps) => {
    const {mutateAsync: CreatePost, isPending: isLoading} = useCreatePost()
    const {mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost()
    const {user} = useUserContext()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post? post?.caption : "",
          file:[],
          location: post? post?.location : "",
          tags: post? post?.tags : "",
        
        },
      })
     
    async function onSubmit(values: z.infer<typeof PostValidation>) {

      if(post && action === 'update'){
        const updatedPost = await updatePost({
          ...values,
          postId:post?.$id,
          imageId:post?.imageId,
          imageUrl:post?.imageUrl
        })

        if(!updatedPost){
          toast({title: 'please try again'})
        }

        return navigate(`/posts/${post.$id}`)
        // return navigate('/')
      }
          const newPost = await CreatePost({
            ...values,
            userId:user.id
          })

          if(!newPost){
            toast({title:'unsuccesful. Please try again'})
          }

          navigate('/')
    }

  return (
    <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col flex-1 gap-5 w-full max-w-5xl ">

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
              </FormControl>
              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add tags</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} placeholder="art, music, education" />
              </FormControl>
              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">cancel</Button>
            <Button type="submit" 
            disabled={isLoading || isLoadingUpdate}
            className="shad-button_primary whitespace-nowrap">
              {isLoading || isLoadingUpdate && 'loading...'}
              {action}Post
            </Button>
        </div>

        </form>


    
    </Form>
  )
}

export default PostForm
