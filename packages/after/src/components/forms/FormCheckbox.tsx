import React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Checkbox Component - Completely different approach again
interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}) => {
  return (
    <div>
      <div
        className={cn(
          "flex items-start mb-3 cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <Checkbox
          id={name}
          name={name}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => {
            // onCheckedChange는 boolean | 'indeterminate'를 반환
            if (typeof value === "boolean") {
              onChange(value);
            }
          }}
          aria-invalid={!!error}
          className={cn("mr-2 mt-0.5")}
        />
        <label
          htmlFor={name}
          className={cn(
            "text-sm text-foreground cursor-pointer leading-snug select-none font-sans",
            error && "text-danger",
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
        </label>
      </div>

      {error && <span className='block text-xs text-danger mt-0.5 ml-6 font-sans'>{error}</span>}
      {hint && !error && (
        <span className='block text-xs text-muted-foreground mt-0.5 ml-6 font-sans'>{hint}</span>
      )}
    </div>
  );
};
