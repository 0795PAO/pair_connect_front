"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Option {
  value: string
  label: string
}

interface MultiSelectorProps {
    options?: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    searchable?: boolean;
}

export function MultiSelector({
  options = [],
  value,
  onChange,
  placeholder = "Select options...",
  searchable = false, // Destructure with default value
}: MultiSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(""); // This tracks the search term
  const buttonRef = React.useRef<HTMLButtonElement>(null); // Button ref to dynamically set PopoverContent width
  const [popoverWidth, setPopoverWidth] = React.useState("auto");

  // Set the width of the PopoverContent dynamically to match the Button's width
  React.useEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(`${buttonRef.current.offsetWidth}px`);
    }
  }, [buttonRef, open]);

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((item) => item !== val));
    } else {
      onChange([...value, val]);
    }
    setInputValue(""); // Reset the search input after selection
  };
  
  // Ensure `options` is always defined and filter based on input value
  const filteredOptions = Array.isArray(options) && options.length > 0
    ? options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    : [];

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex h-9 w-full justify-between border border-input hover:bg-transparent hover:border-primary focus:border-primary focus:ring-primary col-span-1 sm:col-span-2"
            ref={buttonRef} // Reference to the Button element
          >
            <div className="flex-1 min-w-0 flex gap-2 flex-wrap overflow-hidden">
            {value.length > 0 ? (
              value.map((val, i) => {
                const foundOption = options.find((option) => option.value === val);
                return (
                  <div
                    key={i}
                    role="button"
                    onClick={() => handleSetValue(val)}
                    className="relative group px-2 py-1 pr-4 rounded-xl border bg-primary text-black text-xs font-medium cursor-pointer focus:outline-none hover:bg-primary-dark"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleSetValue(val);
                        }
                    }}
                  >
                    {foundOption?.label ?? "Unknown"}
                    <X className="absolute top-0 right-0 mt-0.5 mr-0.5 h-3 w-3 text-black group-hover:text-red-600" />
                  </div>
                );
              })
            ) : (
                  <span className="text-muted-foreground">
                  {placeholder || "Select options..."}
                  </span>
                )}
            </div>
            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-1 max-h-60 overflow-y-hidden rounded-md bg-popover text-popover-foreground"
          side="bottom"
          align="start"
          sideOffset={5}
          style={{ width: popoverWidth }} // Dynamically set the width of PopoverContent
        >
        <Command>
          {searchable && (
            <div className="sticky top-0 bg-popover p-2 z-10">
              <CommandInput
                  placeholder={placeholder}
                  value={inputValue} // Bind the search input to inputValue
                  onValueChange={(value) => setInputValue(value)} // Update inputValue on change
                  className="w-full p-2 bg-offwhite text-black border border-input focus:outline-none rounded-md"
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            // Show nothing or a message when no results are found
            <CommandEmpty>No options found.</CommandEmpty>
          ) : (
            <CommandGroup>
              <CommandList className="max-h-60 p-2 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSetValue(option.value)} // Select the option when pressed
                    className="flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
      </Popover>
    </div>
  );
}

export default MultiSelector