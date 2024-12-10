import Confirm from "@/components/Confirm";
import FormGroup from "@/components/forms/FormGroup";
import Paragraph from "@/components/text/Paragraph";
import { thumbnailIcons } from "@/data/thumbnailIcons";
import { LinkCardProps } from "@/types/types";
import cn from "@/utilities/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { FaImages } from "react-icons/fa";
import {
  FaEarthOceania,
  FaEye,
  FaGripLines,
  FaLink,
  FaTrashCan,
} from "react-icons/fa6";
import * as yup from "yup";
import SelectIconModal from "./SelectIconModal";
import { Reorder, useDragControls } from "motion/react";
import TooltipComponent from "@/components/TooltipComponent";

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
  autoFocus?: boolean;
};

const linkCardFields: LinkCardFieldTypes[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
    placeholder: "Enter the title",
    icon: FaEarthOceania,
    autoFocus: true,
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
    trigger,
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

  // find isVisible field to use in checkbox registration with hook form
  const visibilityField = linkCardFields.find(
    (field) => field.name === "isVisible",
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [showIconModal, setShowIconModal] = useState<boolean>(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // dedicated drag control
  const controls = useDragControls();

  const searchedIcons = useMemo(() => {
    if (!searchTerm) return thumbnailIcons;

    return thumbnailIcons.filter((thumbnail) =>
      thumbnail.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleDeleteLink = () => {
    deleteLink(link.id);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmation = () => {
    // if link is valid (has both title and address) confim before deletion else delete right away

    if (link.title && link.url) {
      setShowDeleteConfirmation(true);
    } else {
      handleDeleteLink();
    }
  };

  const handleFieldChange = (name: keyof LinkCardForm) => {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;

      // Trigger validation for the field
      const isValid = await trigger(name);

      const updatedData = {
        ...getValues(),
        [name]: name === "isVisible" ? checked : isValid ? value : "", // Set to empty string if validation fails
      };

      updateLink({
        id: link.id,
        url: updatedData.link,
        title: updatedData.title,
        isVisible:
          name === "isVisible" ? updatedData.isVisible : link.isVisible,
        icon: link.icon,
      });
    };
  };

  const handleCustomCheckboxClick = () => {
    isVisibleCheckboxRef.current?.click();
  };

  const handleCustomCheckboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleCustomCheckboxClick();
    }
  };

  const handleIconSelection = (icon: string) => {
    updateLink({ ...link, icon });
    setShowIconModal(false);
    setSearchTerm("");
  };

  return (
    <Reorder.Item
      value={link}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ delay: 0.5 }}
    >
      <>
        <div
          className={cn(
            "relative cursor-grabbing rounded-xl border border-lightestGray p-5 hover:border-blue dark:border-transparent",
            link.isVisible ? "bg-lightestGray dark:bg-darkGray" : "",
          )}
        >
          {/* Header: displays link index, delete icon and visibility toggle */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <div
                className="reorder-handle"
                onPointerDown={(e) => controls.start(e)}
              >
                <FaGripLines />
              </div>
              <Paragraph className="font-semibold">{`Link #${index + 1}`}</Paragraph>
            </div>

            <div className="flex items-center">
              <TooltipComponent
                onClick={() => setShowIconModal(true)}
                triggerChildren={
                  <FaImages className="text-sm text-gray dark:text-white" />
                }
                content="Select link icon"
              />

              <TooltipComponent
                onClick={handleDeleteConfirmation}
                triggerChildren={
                  <FaTrashCan className="text-sm text-gray dark:text-white" />
                }
                content="Remove link"
              />

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
                  checked={link.isVisible}
                />
              )}

              <TooltipComponent
                onClick={handleCustomCheckboxClick}
                onKeyDown={handleCustomCheckboxKeyDown}
                // custom checkbox for controlling the real checkbox input
                triggerChildren={
                  <div
                    role="checkbox"
                    aria-checked={link.isVisible}
                    className="flex h-4 w-7 cursor-pointer items-center rounded-xl border border-gray p-[1px] focus:ring-2"
                    tabIndex={0}
                  >
                    <div
                      className={cn(
                        "aspect-square h-3 rounded-full transition duration-500",
                        link.isVisible
                          ? "translate-x-3 bg-green-600 dark:bg-white"
                          : "bg-gray/60 dark:bg-gray",
                      )}
                    ></div>
                  </div>
                }
                content={<Paragraph>Toggle link visibility</Paragraph>}
              />
            </div>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
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

        <SelectIconModal
          closeModal={() => {
            setShowIconModal(false);
            setSearchTerm("");
          }}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          searchedIcons={searchedIcons}
          showSearchedIcons={showIconModal}
          handleIconSelection={handleIconSelection}
        />
      </>
    </Reorder.Item>
  );
};

export default LinkCard;
