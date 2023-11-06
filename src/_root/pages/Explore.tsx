import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import SearchResults from "@/components/shared/SearchResults"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations"
import {useEffect, useState} from 'react'
import { useInView } from "react-intersection-observer"


const Explore = () => {
  const {ref, inView} = useInView()
  const [searchValue, setSearchValue] = useState('')
  const shouldShowSearchResults = searchValue !== ''

  const debouncedValue = useDebounce(searchValue, 500)
  
  const {data: posts, fetchNextPage, hasNextPage} = useGetPosts()
  const {data: searchedPosts, isLoding:isSearchLoading} = useSearchPosts(debouncedValue)

  useEffect(() => {
    if(inView && !searchValue) fetchNextPage()
  }, [inView, searchValue])
  
  if(!posts){
    return (
      <div className="flex-center w-full">
        <Loader/>
      </div>
    )
  }

  const shouldShowResults = !shouldShowSearchResults 
  && posts?.pages.every((item) => item?.documents.length === 0)
  return (
    <div className="explore-container">

      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search posts</h2>
        <div className="flex gap-1 w-full px-4 rounded-lg bg-dark-4">
          <img src='/assets/icons/search.svg' width={24} height={24} alt='src'/>
          <Input 
          type="text" placeholder="search" className="explore-search"
          value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-10 mb-7">
        <h3 className="body-bold md:h3-bold">Popular today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">all</p>
          <img src="/assets/icons/filter.svg" />
        </div>

      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
        <SearchResults isSearchFetching={isSearchLoading} searchedPosts={searchedPosts}/>) 
        : shouldShowResults ? (
          <p className="text-light-4 mt-10 text-center w-full">posts</p>
        ): posts.pages.map((item, index) => (
        <GridPostList key={`page-${index}`} posts={item?.documents}/>
        ))
        }
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader/>
        </div>
      )}

    </div>
  )
}

export default Explore
