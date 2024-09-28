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
import { Button } from "@/components/ui/button";
import CustomFileInput from "@/components/shared/CustomFileInput";

const CustomInput = ({
  label,
  placeholder,
  description,
  name,
  form,
  type,
  options,
  accept,
  multiple = false,
}) => {
  return (
    <FormField 
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="text-left">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            {type === "select" ? (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`pl-3 text-left ${!field.value ? "text-muted-foreground" : ""}`}
                  aria-labelledby={`${name}-label`}
                  multiple={multiple}
                >
                  {field.value || placeholder|| "Seleccione una opción"}
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
              ) : type === "file" ? (
                <CustomFileInput
                  field={field}
                  accept={accept}
                  multiple={multiple}
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
