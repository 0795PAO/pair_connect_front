/* eslint-disable react/prop-types */
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"




const CustomInput = ({ label, placeholder, description, form}) => {
    return (

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}
export default CustomInput