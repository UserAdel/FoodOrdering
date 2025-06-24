import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";




const formSchema = z.object({
    restaurantName: z.string({ required_error: "Name is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string({ required_error: "Country is required" }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery Price is required",
        invalid_type_error: "Delivery Price must be a number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated Delivery Time is required",
        invalid_type_error: "Estimated Delivery Time must be a number"
    }),
    cuisines: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number({
            required_error: "Price is required",
        }),
    })),
    menuItem: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number({
            required_error: "Price is required",
        }),
    })),
    imageFile: z.instanceof(File).refine((file) => file.size <= 1024 * 1024 * 5, {
        message: "Image must be less than 5MB"
    }),
})

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [{
                name: "",
                price: 0,
            }],
            menuItem: [{
                name: "",
                price: 0,
            }],
        }
    });
    const onSubmit = (formDataJson: restaurantFormData) => {
        //TODO CONVERT FORMDATA JSON TO FORMDATA
    }
    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailsSection/>
        <Separator />
        <CuisinesSection/>
        <Separator />
        <MenuSection/>
        <Separator />
        <ImageSection/>
        {isLoading ?
        <LoadingButton/>
        :<Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  );
}
export default ManageRestaurantForm;