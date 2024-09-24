/* eslint-disable react/prop-types */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"


const CustomInput = ({ label, placeholder, name, form, type}) => {
    return (

        <FormField
            control={form.control}
            name={name}
            type={type}
            render={({ field }) => (
                <FormItem >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}
export default CustomInput