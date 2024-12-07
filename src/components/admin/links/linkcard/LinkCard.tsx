import Confirm from "@/components/Confirm";
import FormGroup from "@/components/forms/FormGroup";
import Paragraph from "@/components/text/Paragraph";
import { LinkCardProps } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEarthOceania, FaLink, FaTrashCan } from "react-icons/fa6";
import * as yup from "yup";

type LinkCardForm = {
  title: string;
  link: string;
};

const validationSchema = yup.object({
  title: yup.string().required("Link title is required"),
  link: yup.string().url("Invalid URL").required("Address is required"),
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
];
const LinkCard = ({ index, deleteLink, updateLink, link }: LinkCardProps) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      title: link.title || "",
      link: link.url || "",
    },
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteLink = () => {
    deleteLink(link.id);
    setShowDeleteConfirmation(false);
  };

  const handleFieldChange = (name: keyof LinkCardForm) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValues = getValues();
      const updatedData = {
        ...currentValues,
        [name]: e.target.value,
      };

      updateLink({
        id: link.id,
        url: updatedData.link,
        title: updatedData.title,
      });
    };
  };
  return (
    <div className="relative cursor-grabbing rounded-xl border border-lightestGray bg-lightestGray p-5 hover:border-blue dark:border-transparent dark:bg-darkGray">
      {/* Header: displays link index and delete option */}
      <div className="flex justify-between pb-2">
        <Paragraph className="font-semibold">{`Link #${index + 1}`}</Paragraph>

        <button
          className="rounded border border-transparent p-2 hover:border-orange"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <FaTrashCan
            title="Delete link"
            className="text-sm text-gray dark:text-white"
          />
        </button>
      </div>

      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {linkCardFields.map((field) => (
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
