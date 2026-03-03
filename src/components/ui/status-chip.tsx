import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatusChipProps extends React.HTMLAttributes<HTMLDivElement> {
    status: "Completed" | "Scheduled" | "Failed" | "Running"
}

export function StatusChip({ className, status, ...props }: StatusChipProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-green-500/20 bg-green-500/10 text-green-500 dark:text-green-400": status === "Completed",
                    "border-muted bg-muted text-muted-foreground": status === "Scheduled",
                    "border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400": status === "Failed",
                    "border-blue-500/20 bg-blue-500/10 text-blue-500 dark:text-blue-400": status === "Running",
                },
                className
            )}
            {...props}
        >
            {status}
        </div>
    )
}
