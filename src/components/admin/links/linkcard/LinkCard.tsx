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

/* LinkCard Component
 *
 * Purpose:
 * - A reusable component that displays an editable card for managing individual links.
 * - Allows users to update link details (title, URL, icon, and visibility).
 * - Supports drag-and-drop functionality via `Reorder.Item` for rearranging links.
 *
 * Key Features:
 * - Inline editing of title and URL with validation using `yup`.
 * - Visibility toggle with an accessible custom checkbox.
 * - Icon selection modal for choosing a thumbnail icon for the link.
 * - Confirmation modal for deleting links.
 * - Integration with parent components for updating and deleting links.
 *
 * Example Usage:
 * <LinkCard
 *   index={index}
 *   deleteLink={deleteLink}
 *   updateLink={updateLink}
 *   link={link}
 * />
 *
 * Props:
 * - `index`: The position of the link in the parent array.
 * - `deleteLink`: Callback to delete the link.
 * - `updateLink`: Callback to update the link's data.
 * - `link`: The data object for the current link, containing properties like `title`, `url`, `icon`, and `isVisible`.
 *
 */

type LinkCardForm = {
  title: string;
  link: string;
  isVisible: boolean;
};

// Schema for form validation with yup
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

// Array of form input fields
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

const LinkCard = ({
  index,
  deleteLink,
  updateLink,
  link,
}: LinkCardProps) => {
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

  const visibilityField = linkCardFields[2];

  const [searchTerm, setSearchTerm] = useState("");

  // Modal for icon search and selection
  const [showIconModal, setShowIconModal] = useState<boolean>(false);

  // Modal for confirming deletion
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
    // if link is valid (has both title and address) confirm before deletion else delete right away
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
        [name]: name === "isVisible" ? checked : isValid ? value : "", // if field is url or title set to empty string if validation fails
      };

      updateLink({
        id: link.id,
        url: updatedData.link,
        title: updatedData.title,
        isVisible:
          // if field name is isVisible set the value to updated data else set it to the value from the link state (to avoid it been set to undefined name of field been updated is not isVisible)
          name === "isVisible" ? updatedData.isVisible : link.isVisible,
        icon: link.icon,
      });
    };
  };

  // click the checkbox when the custom checkbox is clicked
  const handleCustomCheckboxClick = () => {
    isVisibleCheckboxRef.current?.click();
  };

  // space and enter keys (on the custom checkbox) triggers handleCustomCheckboxClick function
  const handleCustomCheckboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleCustomCheckboxClick();
    }
  };

  // update link when user selects an icon then close the modal and reset the search term
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
      // animations for entry and exit of links (mounting/unmounting)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 0, transition: { dalay: 0.2 } }}
      exit={{ opacity: 0, x: -200, transition: { delay: 0.5 } }}
    >
      <>
        <div
          className={cn(
            "relative rounded-xl border bg-lightestGray px-4 py-4 hover:border-blue dark:bg-lighterNavy",
            link.isVisible
              ? "border-transparent"
              : "opacity-20 hover:opacity-70 dark:bg-darkGray dark:hover:bg-transparent",
          )}
        >
          {/* Header: Controls for drag, delete, visibility toggle, and icon selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Drag handle for re-arranging the linkcard */}
              <div
                className="reorder-handle cursor-grab"
                onPointerDown={(e) => controls.start(e)}
              >
                <FaGripLines className="" />
              </div>
              {/* Display the index of the link */}
              <Paragraph className="font-semibold">{`Link #${index + 1}`}</Paragraph>
            </div>

            <div className="flex items-center">
              {/* Icon selection trigger */}
              <TooltipComponent
                onClick={() => setShowIconModal(true)}
                triggerChildren={
                  <FaImages className="text-sm text-gray dark:text-white" />
                }
                content="Select link icon"
              />
              {/* Delete link trigger*/}
              <TooltipComponent
                onClick={handleDeleteConfirmation}
                triggerChildren={
                  <FaTrashCan className="text-sm text-gray dark:text-white" />
                }
                content="Remove link"
              />
              {/* Toggle link visibility using a custom checkbox*/}
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

              {/* Custom checkbox */}
              <TooltipComponent
                onClick={handleCustomCheckboxClick}
                onKeyDown={handleCustomCheckboxKeyDown}
                triggerChildren={
                  <div
                    role="checkbox"
                    aria-checked={link.isVisible}
                    className={cn(
                      "flex h-4 w-7 cursor-pointer items-center rounded-xl border border-gray p-[1px] transition duration-300 focus:ring-2",
                      link.isVisible && "border-blue bg-blue",
                    )}
                    tabIndex={0}
                  >
                    <div
                      className={cn(
                        "aspect-square h-3 rounded-full transition duration-500",
                        link.isVisible
                          ? "translate-x-3 bg-white"
                          : "bg-gray/60 dark:bg-gray",
                      )}
                    ></div>
                  </div>
                }
                content="Toggle link visibility"
              />
            </div>
          </div>

          {/* Text inputs for title and URL fields */}
          <div className="md:grid md:grid-cols-2 md:gap-4">
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
                  // inputClassName="dark:bg-transparent bg-transparent border-none placeholder:dark:text-white dark:text-white focs:outline-none focus:border-none focus:ring-0 py-0 w-fit md:w-full pr-0 "
                  // labelClassName="sr-only"
                  // responsive
                />
              ))}
          </div>
        </div>

        {/* Confirmation modal for link deletion */}
        <Confirm
          isOpen={showDeleteConfirmation}
          acceptAction={handleDeleteLink}
          rejectAction={() => setShowDeleteConfirmation(false)}
          header="Delete Link"
          content="Deleting this link will also remove all associated analytics data. Are you sure you want to proceed? You can undo this action before saving."
        />

        {/* Modal for searching and selecting icons */}
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
