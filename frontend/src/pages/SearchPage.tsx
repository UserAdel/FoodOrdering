import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import PaginationSelector from "@/components/PaginationSelector";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CuisineFilter from "@/components/CuisineFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";

export type SearchState = {
  searchQuery: string;
  page:number;
  selectedCuisines:string[];
  sortOption:string;
}

function SearchPage() {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page:1,
    selectedCuisines:[],
    sortOption:"bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
 const { results, isLoading } = useSearchRestaurants(searchState, city)


  const setSortOption=(sortOption:string)=>{
    setSearchState((prevState)=>({
      ...prevState,
      sortOption,
      page:1, 
    }))
  }

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
        <div className="flex flex-col gap-3 lg:flex-row justify-between">

        <SearchResultInfo total={results.pagination.total} city={city} />
        <SortOptionDropdown sortOption={searchState.sortOption} onChange={setSortOption} />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onpageChange={setPage}/>
      </div>
    </div>
  )
}

export default SearchPage;