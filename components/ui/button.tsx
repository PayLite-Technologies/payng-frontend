import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-soft-gold focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#000080] text-white hover:bg-[#0000A0] rounded-[24px]",
        destructive:
          "bg-[#FF6B6B] text-white hover:bg-[#FF5252] rounded-[24px]",
        outline:
          "border border-[#E0E0E0] bg-white hover:bg-[#F5F5F5] text-[#333333] rounded-[24px]",
        secondary:
          "bg-[#90EE90] text-black hover:bg-[#7ED87E] rounded-[24px]",
        ghost:
          "hover:bg-[#F5F5F5] text-[#333333] rounded-[24px]",
        link: "text-[#000080] underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-5",
        sm: "h-8 rounded-[20px] gap-1.5 px-4 has-[>svg]:px-3 text-xs",
        lg: "h-12 rounded-[24px] px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-[24px]",
        "icon-sm": "size-8 rounded-[20px]",
        "icon-lg": "size-12 rounded-[24px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ fontFamily: "Inter, sans-serif" }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
