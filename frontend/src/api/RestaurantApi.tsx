import { SearchState } from "@/pages/SearchPage"
import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useSearchRestaurants=(searchState:SearchState, city?:string)=>{
    const createSearchRequest=async():Promise<RestaurantSearchResponse>=>{
        const params=new URLSearchParams()
        if(searchState.searchQuery){
            params.set("searchQuery",searchState.searchQuery)
        }
        const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        if(!response.ok){
            throw new Error("Failed to fetch restaurants")
        }
        return response.json()
    }

const {data:results,isLoading,error}=useQuery({
    queryKey:["searchRestaurants",searchState],
    queryFn:createSearchRequest,
    enabled:!!city
})

return {results,isLoading,error}
}






