import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { CiImageOn } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { ProfileFormData } from "@/types/types";
import useProfileInfo from "@/custom-hooks/useProfileInfo";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Paragraph from "@/components/text/Paragraph";
import FormGroup from "@/components/forms/FormGroup";
import Button from "@/components/Button";
import cn from "@/utilities/cn";

/* ProfileInfoForm Component
 *
 * Purpose: Displays a form for updating a user's profile information, including an image preview for a profile picture, text fields for name and email, and options to save or log out.
 *
 * Key Features:
 * - Input validation using Yup for structured input rules (e.g., file type and size for profile picture, required fields).
 * - Initial profile data is fetched and set on form load, with preview functionality for the profile image.
 * - Image upload supports drag-and-drop, click-to-select, and file preview.
 * - Conditionally renders loading screen until initial data is ready.
 * - Uses react-hook-form for form control and validation.
 */

const validationSchema = yup.object({
  profilePicture: yup
    .mixed<File>()
    .required("Profile Image is required")
    .test(
      "fileType",
      "Unsupported file format. Only JPEG and PNG are allowed.",
      (value) => {
        if (!value || !(value instanceof File)) return false;
        const acceptedFormats = ["image/jpeg", "image/png"];
        return acceptedFormats.includes(value.type);
      },
    )
    .test("fileSize", "File size too large. Max 1MB allowed.", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 1024 * 1024; // 1MB limit
    }),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not exceed 30 characters")
    .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not exceed 30 characters")
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters"),
  email: yup.string().email("Invalid email format").optional(),
  bio: yup.string().max(500, "Bio must not exceed 500 characters"),
});

const profileInfoFormFields: Array<{
  name: keyof ProfileFormData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}> = [
  {
    name: "profilePicture",
    label: "Profile Picture",
    type: "file",
    placeholder: "+ Upload Image",
    required: false,
  },
  {
    name: "firstName",
    label: "First name*",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last name*",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email",
    required: true,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Enter bio",
    required: false,
  },
];

const ProfileInfoForm = () => {
  // ref to hold the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const { profileInfo, saveProfileInformation, isProfileDetailsSaving } =
    useProfileInfo();
  // dummy file to serve as initial value for file state
  const dummyFile = new File([""], "dummy.txt", { type: "text/plain" });
  const [initialProfileInfo, setInitialProfileInfo] = useState<ProfileFormData>(
    {
      profilePicture: dummyFile,
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // Load initial profile data, set form values and image preview if available
  useEffect(() => {
    const loadProfileData = async () => {
      if (profileInfo) {
        reset({
          profilePicture: undefined,
          firstName: profileInfo.firstName,
          lastName: profileInfo.lastName,
          email: profileInfo.email,
          bio: profileInfo.bio,
        });

        if (profileInfo.profilePicture) {
          setPreviewImage(profileInfo.profilePicture);

          const file = await urlToFile(
            profileInfo.profilePicture,
            "profile-image.jpg",
          );

          setValue("profilePicture", file); // Register file with react-hook-form as initial value for the file input

          setInitialProfileInfo({
            profilePicture: file,
            firstName: profileInfo.firstName,
            lastName: profileInfo.lastName,
            email: profileInfo.email,
            bio: profileInfo.bio,
          });
        }
        setLoading(false); // Set loading to false once data is loaded
      }
    };

    loadProfileData();
  }, [profileInfo, reset, setValue]);

  // Converts an image URL into a File object to support file preview functionality.
  const urlToFile = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const fileInputField = profileInfoFormFields.find(
    (field) => field.name === "profilePicture",
  );

  const handleCustomUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Creates a preview URL from a selected file and updates the file input’s state manually.
  const handleFilePreview = (file: File) => {
    const objectUrl = URL.createObjectURL(file); // Create a URL for the file

    setPreviewImage(objectUrl); // Set the image URL for file preview
  };

  // Processes file selection for direct file input changes and stores the file.
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFilePreview(files[0]);
      setValue("profilePicture", files[0], { shouldValidate: true }); // Register the file with react-hook-form
    }
  };

  // Cleanup: revoke object URL on component unmount
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage); // Cleanup object URL
      }
    };
  }, [previewImage]);

  const areProfilesEqual = (
    profile1: ProfileFormData,
    profile2: ProfileFormData,
  ) => {
    return (
      profile1.firstName === profile2.firstName &&
      profile1.lastName === profile2.lastName &&
      profile1.email === profile2.email &&
      profile1.profilePicture === profile2.profilePicture &&
      profile1.bio === profile2.bio
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    // Check if profile data has changed before saving
    if (areProfilesEqual(data, initialProfileInfo)) {
      toast.error("No changes detected");
      return;
    }

    setImageUploading(true);
    const { profilePicture, firstName, lastName, email, bio } = data;

    await saveProfileInformation(
      profilePicture,
      firstName,
      lastName,
      email,
      bio,
    );

    toast.success("Profile information saved successfully");
    reset();
    setImageUploading(false);
  };

  const saveButtonState =
    areProfilesEqual(watch(), initialProfileInfo) && !isProfileDetailsSaving;

  if (loading) {
    return (
      <div className="grid h-[70vh] w-full place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <form
      action=""
      className="space-y-4 bg-white dark:bg-deepNavy"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile picture preview and upload. */}
      {fileInputField && (
        <div className="mx-6 gap-6 space-y-4 rounded-xl bg-lightestGray p-4 dark:bg-lighterNavy md:flex md:items-center md:justify-between md:space-y-0 lg:border-none">
          <label className="basis-[50%] text-sm text-gray dark:text-white xl:text-base">
            {fileInputField.label}
          </label>

          <div className="relative h-fit">
            {/*
             * the main file input is set to screen reader only to make it invisible and is triggered when the profile preview is clicked
             */}

            {/* profile picture preview */}
            <div
              role="file input"
              className={cn(
                "grid aspect-square w-[193px] cursor-pointer place-content-center space-y-2 overflow-hidden rounded-xl bg-veryLightBlue bg-cover md:w-[220px]",
                errors.profilePicture ? "border border-red" : "",
              )}
              style={{
                backgroundImage: previewImage ? `url(${previewImage})` : "none",
              }}
              onClick={handleCustomUploadClick}
            >
              <CiImageOn className="mx-auto w-fit text-4xl text-blue" />
              <div className="">
                {imageUploading ? (
                  <Loading />
                ) : previewImage ? (
                  <Paragraph className="mx-auto text-nowrap font-semibold text-blue">
                    Click to change
                  </Paragraph>
                ) : (
                  <Paragraph className="mx-auto text-nowrap font-semibold text-blue">
                    {fileInputField.placeholder}
                  </Paragraph>
                )}
              </div>
            </div>

            {/* invisible file input */}
            <input
              {...register(fileInputField.name)}
              type={fileInputField.type}
              ref={fileInputRef}
              placeholder={fileInputField.placeholder}
              required={fileInputField.required}
              className="sr-only absolute top-1/2"
              onChange={handleFileInputChange}
            />
          </div>

          <div className="space-y-4">
            <Paragraph variant="small">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </Paragraph>

            {errors.profilePicture && (
              <Paragraph variant="small" className="text-red">
                {errors.profilePicture.message}
              </Paragraph>
            )}
          </div>
        </div>
      )}

      {/* text inputs*/}
      <div className="mx-6 space-y-2 rounded-xl bg-lightestGray p-4 dark:bg-lighterNavy lg:border-none">
        {profileInfoFormFields
          .filter((field) => field.name !== "profilePicture")
          .map((field, index) => (
            <FormGroup
              key={index}
              register={{ ...register(field.name) }}
              formField={field}
              error={errors[field.name]?.message}
              responsive
            />
          ))}
      </div>

      {/* logout and save buttons */}
      <div className="sticky bottom-0 border-t-2 bg-lightestGray pb-4 dark:bg-deepNavy lg:py-0 lg:border-none lg:bg-white">
        <div className="flex w-full justify-end rounded-b-xl bg-white p-6 dark:border dark:border-lighterGray/50 dark:bg-deepNavy lg:border-none">
          <Button
            className="md:w-fit"
            type="submit"
            disabled={saveButtonState}
            loading={isProfileDetailsSaving}
          >
            Save profile details
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
