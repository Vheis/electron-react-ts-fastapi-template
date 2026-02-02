import * as React from "react"

import { cn } from "@/lib/utils"

type SwitchProps = Omit<
  React.ComponentProps<"button">,
  "type" | "role" | "aria-checked"
> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Switch({
  className,
  checked = false,
  onCheckedChange,
  onClick,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-input bg-muted shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary",
        className
      )}
      onClick={(event) => {
        onCheckedChange?.(!checked)
        onClick?.(event)
      }}
      {...props}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className="pointer-events-none block size-5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      />
    </button>
  )
}

export { Switch }
