import cn from "@/utilities/cn";
import React, { useState } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons";
import Paragraph from "../text/Paragraph";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type FormGroupProps<TFormValues extends FieldValues> = {
  register: ReturnType<UseFormRegister<TFormValues>>;
  formField: {
    label: string;
    name: Path<TFormValues>; // Ensures name matches a valid key in form values
    type: string;
    required: boolean;
    placeholder?: string;
    icon?: IconType;
    autoFocus?: boolean;
  };
  error?: string; // Error message for invalid input
  responsive?: boolean; // Enables responsive grid layout
  options?: { label: string; value: string }[];
  labelClassName?: string;
  inputClassName?: string;
};

const FormGroup = <TFormValues extends FieldValues>({
  register,
  formField,
  error,
  responsive = false,
  labelClassName = "",
  inputClassName = "",
}: FormGroupProps<TFormValues>) => {
  const { name, type, label, placeholder, icon, autoFocus = false } = formField;
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
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
      {/* Input label */}
      <label
        className={cn(
          "text-xs text-gray dark:text-white",
          error && "text-red",
          labelClassName,
        )}
        htmlFor={name}
      >
        {label}
      </label>

      <div className="relative">
        {/* Textarea field */}
        {type === "textarea" ? (
          <textarea
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            id={name}
            className={cn(
              "h-20 w-full rounded-lg border border-lighterGray py-3 pl-10 pr-4 text-sm text-gray placeholder:text-sm placeholder:text-gray hover:border-blue dark:bg-lighterGray lg:h-28",
              error && "border-red",
              responsive ? "pl-4" : "",
              inputClassName,
            )}
            {...register}
            placeholder={placeholder}
            autoFocus={autoFocus}
          ></textarea>
        ) : (
          // Standard input field
          <input
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            id={name}
            className={cn(
              "w-full rounded-lg border border-lighterGray py-3 pl-10 pr-4 text-sm text-gray placeholder:text-sm placeholder:text-gray hover:border-blue dark:bg-lighterGray",
              error && "border-red",
              responsive ? "pl-4" : "",
              inputClassName,
            )}
            type={
              type !== "password" ? type : showPassword ? "text" : "password"
            }
            {...register}
            placeholder={placeholder}
            autoFocus={autoFocus}
          />
        )}

        {/* Optional icon on the left of the input */}
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray" />
        )}

        {/* Password visibility toggle */}
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

        {/* Error message */}
        {error && (
          <Paragraph
            variant="small"
            className={cn(
              "absolute -bottom-4 w-full text-right text-red dark:text-red md:bottom-0 md:right-4 md:top-1/2 md:w-fit md:-translate-y-1/2",
              type === "password" && "md:right-12",
            )}
          >
            {error}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
