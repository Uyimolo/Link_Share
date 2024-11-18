import Button from "@/components/Button";
import FormGroup from "@/components/forms/FormGroup";
import Modal from "@/components/Modal";
import Paragraph from "@/components/text/Paragraph";
import { LinkCardProps } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
};

const linkCardFields: LinkCardFieldTypes[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
    placeholder: "Enter the title",
  },
  {
    label: "Address",
    name: "link",
    type: "text",
    required: true,
    placeholder: "Enter the address",
  },
];
const LinkCard = ({ index, deleteLink, updateLink, link }: LinkCardProps) => {
  const {
    register,
    handleSubmit,
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
    <div className="space-y-4 rounded-xl bg-lightestGray p-5">
      {/* Header: displays link index and delete option */}
      <div className="flex justify-between">
        <Paragraph className="font-semibold">{`Link #${index + 1}`}</Paragraph>

        <Paragraph
          className="cursor-pointer text-gray hover:text-blue"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Remove
        </Paragraph>
      </div>

      <div className="space-y-4">
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

      {showDeleteConfirmation && (
        <Modal closeModal={() => setShowDeleteConfirmation(false)} className="">
          <div className="w-fit max-w-xs space-y-6 rounded-xl bg-white p-4 shadow-2xl shadow-black/50 lg:max-w-sm">
            <Paragraph className="text-red-600 text-lg font-semibold">
              Confirm Deletion
            </Paragraph>
            <Paragraph>
              Are you sure you want to delete this link?
              <br />
              <strong className="text-red">
                This action cannot be undone,
              </strong>{" "}
              and you will lose any data associated with it.
            </Paragraph>

            <div className="flex justify-end space-x-4">
              <Button variant="danger" onClick={handleDeleteLink}>
                Delete
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LinkCard;
