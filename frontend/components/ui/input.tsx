import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Eye, EyeClosed } from "lucide-react";
// import VisibilityIcon from "@mui/icons-material/VisibilityOutlined"
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined"

type passWordInputType = {
  isPasswordInput?: boolean;
}

function Input({ className, type, isPasswordInput = false, ...props }: React.ComponentProps<"input"> & passWordInputType) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <input
        type={isPasswordInput ? showPassword ? "text" : "password" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground/40 selection:bg-primary selection:text-primary-foreground rounded-xs border-input h-10 w-full min-w-0 border bg-surface-container-low px-4 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {
        isPasswordInput &&
        <Button
          type="button"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          variant={"link"}
          onClick={toggleShowPassword}
          size={"icon"}
        >
          { showPassword ? <Eye className="h-3 w-3"/> : <EyeClosed className="h-3 w-3"/> }
        </Button>
      }
    </div>
  )
}

export { Input }
