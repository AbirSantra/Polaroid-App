import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onTogglePassword?: () => void;
  onSearch?: () => void;
  isSearch?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isSearch, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div
        className={cn(
          "flex w-full max-w-80 items-center justify-between gap-4 rounded border border-gray-300 p-3 text-sm text-gray-500 transition-all duration-200 ease-in focus-within:border-rose-500 focus-within:text-rose-500",
          className
        )}
      >
        {/* Search Button */}
        {isSearch && (
          <span className="cursor-pointer">
            <Search size={18} />
          </span>
        )}
        {/* Icon */}
        {icon}
        {/* Input */}
        <input
          type={showPassword ? "text" : type}
          className={cn(
            "w-full border-none bg-transparent text-sm font-medium text-gray-900 outline-none transition-all duration-200 ease-in placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
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
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
