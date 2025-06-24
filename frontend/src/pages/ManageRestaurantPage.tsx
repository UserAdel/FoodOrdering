import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateRestaurant } from "@/api/MyRestaurantApi";


export default function ManageRestaurantPage() {
  const {createMyRestaurant,isLoading} = useCreateRestaurant();
  return (
  <ManageRestaurantForm onSave={createMyRestaurant} isLoading={isLoading}/>
  )
}
