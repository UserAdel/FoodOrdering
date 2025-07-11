import { cuisineList } from "@/cofig/restaurant-option-config";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";


export default function CuisinesSection() {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    set the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisine) => (
                            <CuisineCheckbox key={cuisine} cuisine={cuisine} field={field}/>
                        ))}
                    </div>

                </FormItem>
            )}/>
        </div>
    )
}
