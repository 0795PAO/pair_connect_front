/* eslint-disable react/prop-types */
import { useMemo } from "react";
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
import MultiSelector from "@/components/ui/multiSelector";
import CustomFileInput from "@/components/shared/CustomFileInput";
import { useFormContext } from "react-hook-form";

// Utility function to check if an option is an object with 'value' and 'label'
const isOptionObject = (option) =>
  option && typeof option === "object" && "value" in option && "label" in option;

const CustomDynamicInput = ({
  label,
  placeholder,
  description,
  name,
  type,
  options = [],
  accept,
  multiple = false,
  defaultValue,
}) => {
  const { control, setValue } = useFormContext();

  /// Memoize options normalization to avoid unnecessary recalculations
  const normalizedOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      console.error("Expected an array for options but got:", options);
      return [];
    }

    return options.map((option) =>
      typeof option === "string"
        ? { value: option, label: option }
        : isOptionObject(option)
          ? option
          : { value: String(option), label: String(option) }
    );
  }, [options]);

  // Handle changes from MultiSelector
  const handleMultiChange = (newValues) => {
    setValue(name, newValues || [], { shouldValidate: true });
  };

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {

        return (

          <FormItem className="text-left text-lg">
            <FormLabel htmlFor={name} className="text-base">{label}</FormLabel>
            <FormControl>
              {type === "select" ? (
                <Select value={Array.isArray(field.value) ? field.value[0] || defaultValue || "" : field.value || defaultValue || ""} onValueChange={(val) => field.onChange(val)} name={name}>
                  <SelectTrigger
                    className={`pl-3 text-left ${!field.value ? "text-muted-foreground" : ""
                      }`}
                    aria-labelledby={`${name}-label`}
                  >
                    {field.value
                      ? normalizedOptions.find((opt) => opt?.value === field.value)?.label || "Unknown Option"
                      : placeholder || "Seleccione una opción"}
                  </SelectTrigger>
                  <SelectContent>
                    {normalizedOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  value={field.value || defaultValue || ""}
                />
              ) : type === "multiselect" ? (
                <MultiSelector
                  options={normalizedOptions}
                  value={field.value || defaultValue || []}
                  onChange={handleMultiChange}
                  placeholder={placeholder}
                  searchable // Allow search
                  name={name}
                />
              ) : type === "file" ? (
                <CustomFileInput
                  field={field}
                  accept={accept}
                  multiple={multiple}
                  placeholder={placeholder}
                  value={field.value || defaultValue || ""}

                />
              ) : (
                <Input
                  placeholder={placeholder}
                  type={type}
                  id={name}
                  {...field}
                  value={field.value || defaultValue || ""}
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }
      }
    />
  );
};

export default CustomDynamicInput;
