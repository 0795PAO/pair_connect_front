/* eslint-disable react/prop-types */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

const CustomInput = ({
  label,
  placeholder,
  description,
  name,
  form,
  type,
  options,
  multiple = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            {type === "select" ? (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger
                  className="pl-3 text-left"
                  aria-labelledby={`${name}-label`}
                  multiple={multiple}
                >
                  {field.value || "Seleccione una opción"}
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                id={name}
                {...field}
                value={field.value || ""}
              />
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                id={name}
                {...field}
                value={field.value || ""}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
