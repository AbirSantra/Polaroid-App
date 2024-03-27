import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <p className="text-sm font-medium">{label}</p>}

        <textarea
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
