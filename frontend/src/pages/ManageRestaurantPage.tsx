import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateRestaurant, useGetRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";


export default function ManageRestaurantPage() {
  const {createMyRestaurant,isLoading:isCreatingLoading} = useCreateRestaurant();
  const {restaurant} = useGetRestaurant();
  const {updateMyRestaurant,isLoading:isUpdating} = useUpdateMyRestaurant();

const isEditing=!!restaurant;



  return (
  <ManageRestaurantForm  restaurant={restaurant} onSave={isEditing? updateMyRestaurant: createMyRestaurant} isLoading={isCreatingLoading || isUpdating} />
  )
}
