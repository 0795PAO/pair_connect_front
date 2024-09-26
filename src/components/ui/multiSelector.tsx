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
} from "cmdk"
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
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelector({ options, value, onChange, placeholder }: MultiSelectorProps) {
  const [open, setOpen] = React.useState(false)
  //const [value, setValue] = React.useState<string[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
        onChange(value.filter((item) => item !== val))
    } else {
        onChange([...value, val])
    }
  }
  
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="relative w-full">
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="min-w-full justify-between border border-input hover:bg-transparent hover:border-primary focus:border-primary focus:ring-primary col-span-1 sm:col-span-2"
            >
                <div className="flex-1 min-w-0 flex gap-2 flex-wrap overflow-hidden">
                    {value.length > 0 ? (
                        value.map((val, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSetValue(val)}
                                className="relative group px-2 py-1 pr-4 rounded-xl border bg-primary text-black text-xs font-medium cursor-pointer focus:outline-none hover:border-gray-500"
                            >
                                {options.find((option) => option.value === val)?.label}
                                <X className="absolute top-0 right-0 mt-0.5 mr-0.5 h-3 w-3 text-black group-hover:text-red-600" />
                            </button>
                        ))
                    ) : (
                        <span className="text-muted-foreground">
                            {placeholder || "Select options..."}
                        </span>
                    )}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-full p-0 overflow-hidden rounded-md  bg-popover text-popover-foreground" side="bottom" align="start" sideOffset={5}>
            <Command>
                <CommandInput
                    placeholder={placeholder || "Search..."}
                    value={inputValue}
                    onValueChange={setInputValue}
                    className="min-w-full bg-muted-foreground text-black"
                />
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                    <CommandList>
                        {filteredOptions.slice(0, 5).map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={() => {
                                    handleSetValue(option.value)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value.includes(option.value) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
    </div>
)
}

export default MultiSelector