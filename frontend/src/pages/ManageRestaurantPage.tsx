import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateRestaurant, useGetRestaurant } from "@/api/MyRestaurantApi";


export default function ManageRestaurantPage() {
  const {createMyRestaurant,isLoading} = useCreateRestaurant();
  const {restaurant} = useGetRestaurant();

  return (
  <ManageRestaurantForm restaurant={restaurant} onSave={createMyRestaurant} isLoading={isLoading}/>
  )
}
