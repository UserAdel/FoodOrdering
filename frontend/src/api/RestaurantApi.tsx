import { SearchState } from "@/pages/SearchPage"
import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useSearchRestaurants=(searchState:SearchState, city?:string)=>{
    const createSearchRequest=async():Promise<RestaurantSearchResponse>=>{
        const params=new URLSearchParams()
        
        if(searchState.searchQuery){
            params.set("searchQuery",searchState.searchQuery)
        }
        if(searchState.page){
            params.set("page",searchState.page.toString())
        }
        if(searchState.selectedCuisines.length > 0){
            params.set("selectedCuisines",searchState.selectedCuisines.join(","))
        }
        if(searchState.sortOption){
            params.set("sortOption",searchState.sortOption)
        }
        
        const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        if(!response.ok){
            throw new Error("Failed to fetch restaurants")
        }
        return response.json()
    }

const {data:results,isLoading,error}=useQuery({
    queryKey:["searchRestaurants",city,searchState.searchQuery,searchState.page,searchState.selectedCuisines,searchState.sortOption],
    queryFn:createSearchRequest,
    enabled:!!city
})

return {results,isLoading,error}
}






