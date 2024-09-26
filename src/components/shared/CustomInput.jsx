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

import { Textarea } from "@/components/ui/textarea";
import { MultiSelector } from "@/components/ui/multiSelector"

const CustomInput = ({
  label,
  placeholder,
  description,
  name,
  form,
  type,
  options,
  accept,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "select" ? (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger
                  className="pl-3 text-left"
                  aria-labelledby={`${name}-label`}
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
                  {...field}
                  value={field.value || ""}
                />
              ) : type === "multiselect" ? (
                <MultiSelector
                  options={options}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder={placeholder}
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
