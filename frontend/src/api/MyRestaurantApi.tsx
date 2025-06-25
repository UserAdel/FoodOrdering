import { Restaurant } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData):Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return response.json();
    }



    const { mutate: createMyRestaurant, isPending: isLoading, isSuccess, error } = useMutation({
        mutationFn: createMyRestaurantRequest
    })

    if (isSuccess) {
        toast.success("Restaurant created successfully");
    }
    if (error) {
        toast.error(error.message);
    }

    return {
        createMyRestaurant,
        isLoading,
    }
}

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const GetRestaurantRequest = async ():Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return response.json();
    }


const {data:restaurant, isLoading, isSuccess, error} = useQuery({
    queryKey: ["restaurant"],
    queryFn: GetRestaurantRequest
})

    return {
        restaurant,
        isLoading,
    }
}


