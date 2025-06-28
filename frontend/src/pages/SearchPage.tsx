import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import PaginationSelector from "@/components/PaginationSelector";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CuisineFilter from "@/components/CuisineFilter";

export type SearchState = {
  searchQuery: string;
  page:number;
  selectedCuisines:string[];
}

function SearchPage() {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page:1,
    selectedCuisines:[],
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city)

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage=(page:number)=>{
    setSearchState((prevState)=>({
      ...prevState,
      page,
    }))
  }

  const SetSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page:1,
    }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
      selectedCuisines: [],
    }))
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!results?.data || !city) {
    return <span>no results found</span>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
      <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}  
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={SetSearchQuery} onReset={resetSearch} placeHolder="Search by cuisine or restaurant name" />
        <SearchResultInfo total={results.pagination.total} city={city} />

        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onpageChange={setPage}/>
      </div>
    </div>
  )
}

export default SearchPage;