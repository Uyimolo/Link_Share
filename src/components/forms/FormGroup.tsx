import cn from "@/utilities/cn";
import React, { useState } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons";
import Paragraph from "../text/Paragraph";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// Define the props type for the FormGroup component
type FormGroupProps<TFormValues extends FieldValues> = {
  register: ReturnType<UseFormRegister<TFormValues>>;
  formField: {
    label: string;
    name: Path<TFormValues>; // Ensures name is a valid key from TFormValues for type safety
    type: string;
    required: boolean;
    placeholder?: string;
    icon?: IconType;
  };
  error?: string;
  responsive?: boolean; // Determines whether the component should adapt to a grid layout on medium screens
  options?: { label: string; value: string }[]; // For select fields, an array of options with label and value
  labelClassName?: string
  inputClassName?: string; 
};

const FormGroup = <TFormValues extends FieldValues>({
  register,
  formField,
  error,
  responsive = false,
  labelClassName = '',
  inputClassName = ''
  // options,
}: FormGroupProps<TFormValues>) => {
  const { name, type, label, placeholder, icon } = formField;
  const [showPassword, setShowPassword] = useState(false);
  const Icon = icon;

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-2",
        responsive
          ? "space-y-0 md:grid md:grid-cols-[40%,1fr] md:items-center"
          : "",
      )}
    >
      <label
        className={cn("text-xs text-gray", error && "text-red" , labelClassName)}
        htmlFor={name}
      >
        {label}
      </label>

      <div className="relative">
        <input
          className={cn(
            "w-full rounded-lg border border-lighterGray py-3 pl-10 pr-4 text-sm text-gray placeholder:text-sm placeholder:text-gray hover:border-blue",
            error && "border-red",
            responsive ? "pl-4" : "", inputClassName
          )}
          type={type !== "password" ? type : showPassword ? "text" : "password"}
          {...register}
          placeholder={placeholder}
        />

        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray" />
        )}

        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        {error && (
          <Paragraph
            variant="small"
            className="absolute -bottom-4 w-full text-right text-red md:bottom-0 md:right-4 md:top-1/2 md:w-fit md:-translate-y-1/2"
          >
            {error}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
