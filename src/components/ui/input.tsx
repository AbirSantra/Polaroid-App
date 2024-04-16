import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onTogglePassword?: () => void;
  onSearch?: () => void;
  isSearch?: boolean;
  label?: string;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isSearch, icon, label, description, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex w-full flex-col gap-2">
        {label && <p className="text-sm font-medium">{label}</p>}
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded border border-gray-300 p-3 text-sm text-gray-500 transition-all duration-200 ease-in focus-within:border-rose-500 focus-within:text-rose-500",
            className
          )}
        >
          {/* Icon */}
          {icon}
          {/* Input */}
          <input
            type={showPassword ? "text" : type}
            className={cn(
              "w-full border-none bg-transparent text-sm text-gray-900 outline-none transition-all duration-200 ease-in placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
            )}
            ref={ref}
            {...props}
          />
          {/* Show/Hide Password */}
          {type === "password" && (
            <span
              onClick={toggleShowPassword}
              className="cursor-pointer select-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          )}
          {/* Search Button */}
          {isSearch && (
            <span className="cursor-pointer">
              <Search size={18} />
            </span>
          )}
        </div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
