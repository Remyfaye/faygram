import { INewPost, INewUser, IUpdatePost } from "@/types"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, createUserAccount, deletePost, deleteSavedPost, getAllPosts, getAllUsers, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getSavedPosts, getUserPostById, likePost, savePost, searchPost, signInAccount, signOutAccount, updatePost } from "../appwrite/api"

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn:(user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn:(
            user:{email:string, password:string}
            ) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn:() => signOutAccount()
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

export const useGetResentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn:getRecentPosts
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      {postId, likesArray}: {postId:string, likesArray:string[]}
    ) => likePost(postId, likesArray),
    onSuccess:(data) => {
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      {postId, userId}: {postId:string, userId:string}
    ) => savePost(postId, userId),
    onSuccess:(data) => {
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POSTS]
      })

      
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (saveRecordId:string) => deleteSavedPost(saveRecordId),
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_POSTS]
      })

      
    }
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}

export const useGetSavedPost = () => {
  return(
    useQuery({
      queryKey:[QUERY_KEYS.GET_SAVED_POSTS],
      queryFn:getSavedPosts
    })
  )
}
export const useGetPostById = (postId:string) => {
  return useQuery ({
    queryKey:[QUERY_KEYS.GET_POST_BY_ID],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
}

export const useGetUserPostById = (userId:string) => {
  return useQuery ({
    queryKey:[QUERY_KEYS.GET_USER_POST_BY_ID],
    queryFn: () => getUserPostById(userId),
    enabled: !!userId
  })
}

export const useUpdatePost= () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};


export const useGetPosts01 = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,

    getNextPageParam: (lastPage) => {

      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;

      return lastId;
    },
    
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey:[QUERY_KEYS.GET_USERS],
    queryFn:getAllUsers
  })
}

export const useGetPosts = () => {
  return useQuery({
    queryKey:[QUERY_KEYS.GET_USERS],
    queryFn:getAllPosts
  })
}


export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPost(searchTerm),
    enabled: !!searchTerm,
  });
};




















