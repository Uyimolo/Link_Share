import Confirm from "@/components/Confirm";
import FormGroup from "@/components/forms/FormGroup";
import Paragraph from "@/components/text/Paragraph";
import { LinkCardProps } from "@/types/types";
import cn from "@/utilities/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEarthOceania, FaEye, FaLink, FaTrashCan } from "react-icons/fa6";
import * as yup from "yup";

type LinkCardForm = {
  title: string;
  link: string;
  isVisible: boolean;
};

const validationSchema = yup.object({
  title: yup.string().required("Link title is required"),
  link: yup.string().url("Invalid URL").required("Address is required"),
  isVisible: yup.boolean().required("Please set link visibility"),
});

type LinkCardFieldTypes = {
  label: string;
  name: keyof LinkCardForm;
  type: string;
  required: boolean;
  placeholder: string;
  icon: IconType;
};

const linkCardFields: LinkCardFieldTypes[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
    placeholder: "Enter the title",
    icon: FaEarthOceania,
  },
  {
    label: "Address",
    name: "link",
    type: "text",
    required: true,
    placeholder: "Enter the address",
    icon: FaLink,
  },
  {
    label: "isVisible",
    name: "isVisible",
    type: "checkbox",
    required: true,
    placeholder: "",
    icon: FaEye,
  },
];
const LinkCard = ({ index, deleteLink, updateLink, link }: LinkCardProps) => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      title: link.title || "",
      link: link.url || "",
      isVisible: link.isVisible || true,
    },
  });

  const isVisibleCheckboxRef = useRef<HTMLInputElement>(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteLink = () => {
    deleteLink(link.id);
    setShowDeleteConfirmation(false);
  };

  const visibilityField = linkCardFields.find(
    (field) => field.name === "isVisible",
  );

  const handleFieldChange = (name: keyof LinkCardForm) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValues = getValues();
      const updatedData = {
        ...currentValues,
        [name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };

      updateLink({
        id: link.id,
        url: updatedData.link,
        title: updatedData.title,
        isVisible: updatedData.isVisible,
      });
    };
  };

  const handleCustomCheckboxClick = () => {
    isVisibleCheckboxRef.current?.click();
  };

  const handleCustomCheckboxKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleCustomCheckboxClick();
    }
  };

  return (
    <div
      className={cn(
        "relative cursor-grabbing rounded-xl border border-lightestGray p-5 hover:border-blue dark:border-transparent",
        link.isVisible ? "bg-lightestGray dark:bg-darkGray" : "opacity-40",
      )}
    >
      {/* Header: displays link index, delete icon and visibility toggle */}
      <div className="flex items-center justify-between pb-2">
        <Paragraph className="font-semibold">{`Link #${index + 1}`}</Paragraph>

        <div className="flex items-center">
          <button
            className="justify-self-end rounded border border-transparent p-2 hover:border-orange"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <FaTrashCan
              title="Delete link"
              className="text-sm text-gray dark:text-white"
            />
          </button>

          {/* checkbox is set to screen reader only and can only be clicked through the custom checkbox below */}
          {visibilityField && (
            <input
              className="sr-only justify-self-end"
              tabIndex={-1}
              type="checkbox"
              {...register(visibilityField.name, {
                onChange: handleFieldChange(visibilityField?.name),
              })}
              ref={isVisibleCheckboxRef}
              checked={watch("isVisible")}
            />
          )}

          {/* custom checkbox for controlling the real checkbox input */}
          <div
            role="checkbox"
            aria-checked={link.isVisible}
            className="flex h-4 w-8 cursor-pointer items-center rounded-xl border border-gray p-[1px] focus:ring-2"
            onClick={handleCustomCheckboxClick}
            onKeyDown={handleCustomCheckboxKeyDown}
            tabIndex={0}
          >
            <div
              className={cn(
                "aspect-square h-3 rounded-full bg-blue transition duration-500",
                link.isVisible ? "translate-x-4 bg-blue" : "bg-gray",
              )}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {linkCardFields
          .filter((field) => field.name !== "isVisible")
          .map((field) => (
            <FormGroup
              key={field.name}
              register={{
                ...register(field.name, {
                  onChange: handleFieldChange(field.name),
                }),
              }}
              formField={field}
              error={errors[field.name]?.message}
            />
          ))}
      </div>

      <Confirm
        isOpen={showDeleteConfirmation}
        acceptAction={handleDeleteLink}
        rejectAction={() => setShowDeleteConfirmation(false)}
        header="Delete Link"
        content="Deleting this link will also remove all associated analytics data. Are you sure you want to proceed? You can undo this action before saving."
      />
    </div>
  );
};

export default LinkCard;
