import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "critical" | "high" | "medium" | "low"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "bg-primary/10 text-primary": variant === "default",
                    "bg-red-500 text-white": variant === "critical",
                    "bg-orange-500 text-white": variant === "high",
                    "bg-yellow-500 text-black": variant === "medium",
                    "bg-green-500 text-white": variant === "low",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
