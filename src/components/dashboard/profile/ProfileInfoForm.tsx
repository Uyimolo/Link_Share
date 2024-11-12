import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CiImageOn } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { ProfileFormData } from '@/types/types';
import useProfileInfo from '@/custom-hooks/useProfileInfo';
import { toast } from 'sonner';
import Loading from '@/components/Loading';
import Paragraph from '@/components/text/Paragraph';
import FormGroup from '@/components/forms/FormGroup';
import Button from '@/components/Button';

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
    .required('Profile Image is required')
    .test(
      'fileType',
      'Unsupported file format. Only JPEG and PNG are allowed.',
      (value) => {
        if (!value || !(value instanceof File)) return false;
        const acceptedFormats = ['image/jpeg', 'image/png'];
        return acceptedFormats.includes(value.type);
      }
    )
    .test('fileSize', 'File size too large. Max 1MB allowed.', (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 1024 * 1024; // 1MB limit
    }),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').optional(),
});

const profileInfoFormFields: Array<{
  name: keyof ProfileFormData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}> = [
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'file',
    placeholder: '+ Upload Image',
    required: true,
  },
  {
    name: 'firstName',
    label: 'First name*',
    type: 'text',
    placeholder: 'Enter first name',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last name*',
    type: 'text',
    placeholder: 'Enter last name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Enter email',
    required: true,
  },
];

const ProfileInfoForm = ({
  setShowAccountOptions,
}: {
  setShowAccountOptions: (showAccountOptions: boolean) => void;
}) => {
  // ref to hold the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const { profileInfo, saveProfileInformation } = useProfileInfo();
  // dummy file to serve as initial value for file state
  const dummyFile = new File([''], 'dummy.txt', { type: 'text/plain' });
  const [initialProfileInfo, setInitialProfileInfo] = useState<ProfileFormData>(
    {
      profilePicture: dummyFile,
      firstName: '',
      lastName: '',
      email: '',
    }
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
    mode: 'onChange',
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
        });

        if (profileInfo.profilePicture) {
          setPreviewImage(profileInfo.profilePicture);

          const file = await urlToFile(
            profileInfo.profilePicture,
            'profile-image.jpg'
          );
          setValue('profilePicture', file); // Register file with react-hook-form
          // setInitialFile(file);
          setInitialProfileInfo({
            profilePicture: file,
            firstName: profileInfo.firstName,
            lastName: profileInfo.lastName,
            email: profileInfo.email,
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current!.files = dataTransfer.files; // Set file input manually
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
    (field) => field.name === 'profilePicture'
  );

  const handleCustomUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Creates a preview URL from a selected file and updates the file input’s state manually.
  const handleFileSelect = (file: File) => {
    const objectUrl = URL.createObjectURL(file); // Create a URL for the file

    setPreviewImage(objectUrl); // Set the image URL for file preview

    // Manually set the file input value
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInputRef.current!.files = dataTransfer.files;
  };

  // Processes file selection for direct file input changes and stores the file.
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
      setValue('profilePicture', files[0]); // Register the file with react-hook-form
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
    profile2: ProfileFormData
  ) => {
    return (
      profile1.firstName === profile2.firstName &&
      profile1.lastName === profile2.lastName &&
      profile1.email === profile2.email &&
      profile1.profilePicture === profile2.profilePicture
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    // Check if profile data has changed before saving
    if (areProfilesEqual(data, initialProfileInfo)) {
      toast.error('No changes detected');
      return;
    }

    setImageUploading(true);
    const { profilePicture, firstName, lastName, email } = data;
    await saveProfileInformation(profilePicture, firstName, lastName, email);
    reset();
    setImageUploading(false);
  };

  const saveButtonState = areProfilesEqual(watch(), initialProfileInfo);

  if (loading) {
    return (
      <div className='w-full h-[70vh] grid place-content-center'>
        <Loading />
      </div>
    );
  }

  return (
    <form
      action=''
      className='space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}>
      {/* Profile picture preview and upload. */}
      {fileInputField && (
        <div className='space-y-4 p-4 bg-lightestGray rounded-xl md:flex md:justify-between md:items-center gap-6 md:space-y-0'>
          <label className='text-gray text-sm xl:text-base basis-[50%]'>
            {fileInputField.label}
          </label>

          <div className='relative  h-fit  p-2'>
            {/*
             * the main file input is positioned below the profile picture preview div and is triggered when the profile preview is clicked
             */}

            {/* profile picture preview */}
            <div
              className='space-y-2 overflow-hidden rounded-xl bg-cover w-[193px] md:w-[220px] aspect-square  bg-veryLightBlue grid place-content-center cursor-pointer absolut'
              style={{
                backgroundImage: previewImage ? `url(${previewImage})` : 'none',
              }}
              onClick={handleCustomUploadClick}>
              <CiImageOn className='text-blue w-fit mx-auto text-4xl' />
              <Paragraph className='text-blue mx-auto text-nowrap font-semibold'>
                {imageUploading ? (
                  <Loading />
                ) : previewImage ? (
                  'click to change'
                ) : (
                  fileInputField.placeholder
                )}
              </Paragraph>
            </div>

            <input
              {...register(fileInputField.name)}
              type={fileInputField.type}
              ref={fileInputRef}
              placeholder={fileInputField.placeholder}
              required={fileInputField.required}
              className='absolute top-1/2 sr-only'
              onChange={handleFileInputChange}
            />
          </div>

          <Paragraph variant='small'>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </Paragraph>
        </div>
      )}
      {/* text info */}
      <div className='space-y-2 p-4 bg-lightestGray rounded-xl'>
        {profileInfoFormFields
          .filter((field) => field.name !== 'profilePicture')
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
      <div className='py-4 mt-1 flex md:flex-row flex-col-reverse gap-2 justify-between bg-white w-full sticky bottom-0 rounded-b-xl md:'>
        <Button
          className='md:w-fit'
          variant='danger'
          type='button'
          onClick={() => {
            setShowAccountOptions(true);
          }}>
          Account actions
        </Button>

        <Button className='md:w-fit' type='submit' disabled={saveButtonState}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
