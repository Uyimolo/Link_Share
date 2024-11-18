import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import Paragraph from "@/components/text/Paragraph";
import { options } from "@/data/options";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

type SelectInputProps<TFormValues extends FieldValues> = {
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
};

const SelectInput = <TFormValues extends FieldValues>({
  register,
  formField,
  error,
  responsive = false,
  options,
}: {
  SelectInputProps;
}) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="py-6">
          <SelectValue placeholder="Please select a value" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {options.map((option, index) => {
              const { value, label } = option;
              return (
                <SelectItem key={index} value={value}>
                  <div className="flex items-center gap-4">
                    <Paragraph>{label}</Paragraph>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
