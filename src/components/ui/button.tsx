import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-button_hover hover-shadow-custom",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        specialShadow: "bg-primary text-primary-foreground shadow transition-transform duration-400 ease-in-out hover:scale-105 hover:bg-button_hover hover:shadow-[0px_0px_50px_20px_rgba(50,209,255,0.8)] px-8 py-4 text-lg md:px-10 md:py-5 md:text-xl lg:px-12 lg:py-6 lg:text-2xl",
        doubleColorButton: "bg-secondary text-primary-foreground shadow-lg transition-transform duration-400 ease-in-out hover:scale-105 hover:bg-button_hover hover:shadow-[0px_0px_15px_5px_rgba(255,60,206,0.6),0px_0px_5px_2px_rgba(255,255,255,0.5)] dark:hover:shadow-[0px_0px_15px_5px_rgba(147, 112, 219, 1),0px_0px_5px_2px_rgba(255,255,255,0.5)] px-8 py-4 text-lg md:px-10 md:py-5 md:text-xl lg:px-12 lg:py-6",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
