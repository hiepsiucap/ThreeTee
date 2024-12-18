import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

const RadioGroup = RadioGroupPrimitive.Root
const RadioGroupItem = React.forwardRef
  React.ElementRef<typeof RadioGroupPrimitive.RadioGroupItem>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.RadioGroupItem>
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      {...props}
      className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.RadioGroupItem.displayName

export { RadioGroup, RadioGroupItem }