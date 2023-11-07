import { useState } from "react";
// import { useInView } from "react-intersection-observer";

// import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
// import GridPostList from "@/components/shared/GridPostList";
import { Input } from "@/components/ui/input";
// import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { homeFeed } from "@/constants";
// import PostStats from "@/components/shared/PostStats";
import { Link } from "react-router-dom";

export type SearchResultProps = {
  isSearchFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchedPosts: any;
};

// const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
//   if (isSearchFetching) {
//     return <Loader />;
//   } else if (searchedPosts && searchedPosts.documents.length > 0) {
//     return <GridPostList posts={searchedPosts.documents} />;
//   } else {
//     return (
//       <p className="text-light-4 mt-10 text-center w-full">No results found</p>
//     );
//   }
// };

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements between randomIndex and i
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}

const Explore = () => {
  // const { ref, inView } = useInView();
  // const { data: posts  } = useGetPosts();

  const shuffledArray = shuffleArray(homeFeed);

  const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue, 500);
  // const { data: searchedPosts, isFetching: isSearchFetching } = 
  // useSearchPosts(debouncedSearch);

  // useEffect(() => {
  //   if (inView && !searchValue) {
  //     fetchNextPage();
  //   }
  // }, [inView, searchValue]);

  if (!homeFeed)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts = !shouldShowSearchResults
    // posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9">

      <ul className="grid-container ">
      {shuffledArray.map((item) => (
               <li className="relative min-w-80 h-80">
                 <Link to={`/posts/${item.id}`} className="grid-post_link">
                   <img
                     src={item.imageUrl}
                     alt="post"
                     className="h-full w-full object-cover"
                   />
                 </Link>
       
                 <div className="grid-post_user">
                   
                     <div className="flex items-center justify-start gap-2 flex-1">
                       <img
                         src={
                          item.creatorImg ||
                           "/assets/icons/profile-placeholder.svg"
                         }
                         alt="creator"
                         className="w-8 h-8 rounded-full"
                       />
                       <p className="line-clamp-1">{item.creator}</p>
                     </div>
                   {/* {<PostStats post={item} userId={item.id} />} */}
                 </div>
               </li>
          ))}
      </ul>
       
          

      </div>

      {/* {!searchValue && (
        <div  className="mt-10">
          <Loader />
        </div>
      )} */}
    </div>
  );
};

export default Explore;