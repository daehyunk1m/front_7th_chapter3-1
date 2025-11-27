import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface FormInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: "small" | "medium" | "large" | "full";
}

const widthClasses = {
  small: "w-[200px]",
  medium: "w-[300px]",
  large: "w-[400px]",
  full: "w-full",
};

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = "full",
}) => {
  const displayError = error || "";

  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block mb-1.5 text-foreground text-[13px] font-bold font-sans'
        >
          {label}
          {required && <span className='text-danger'>*</span>}
        </label>
      )}

      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(
          "px-2.5 py-2 text-sm font-sans text-foreground border border-border rounded-sm bg-background box-border",
          "focus:border-primary focus:outline-none",
          "disabled:bg-muted disabled:cursor-not-allowed",
          displayError && "border-danger",
          widthClasses[width]
        )}
      />

      {displayError && (
        <span className='block mt-1 text-xs font-sans text-danger'>{displayError}</span>
      )}
      {helpText && !displayError && (
        <span className='block mt-1 text-xs font-sans text-muted-foreground'>{helpText}</span>
      )}
    </div>
  );
};
