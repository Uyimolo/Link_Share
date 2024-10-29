import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FormGroup from '../forms/FormGroup';
import Paragraph from '../text/Paragraph';
import { CiImageOn } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { ProfileFormData } from '@/types/types';
import useProfileInfo from '@/custom-hooks/useProfileInfo';
import { toast } from 'sonner';
import Loading from '../Loading';
import { useAuthContext } from '@/context/AuthContext';

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

const ProfileInfoForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { profileInfo, saveProfileInformation } = useProfileInfo();
  const { logout } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const dummyFile = new File([''], 'dummy.txt', { type: 'text/plain' });
  const [initialProfileInfo, setInitialProfileInfo] = useState<ProfileFormData>(
    {
      profilePicture: dummyFile,
      firstName: '',
      lastName: '',
      email: '',
    }
  );

  console.log(profileInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  // set initial values for input fields
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

  const handleFileSelect = (file: File) => {
    // setFileName(file.name); // Set the name of the uploaded file
    const objectUrl = URL.createObjectURL(file); // Create a URL for the file
    setPreviewImage(objectUrl); // Set the image URL for the background
    // Manually set the file input value
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInputRef.current!.files = dataTransfer.files;
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]); // Handle the first file selected
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

  const onSubmit = (data: ProfileFormData) => {
    if (areProfilesEqual(data, initialProfileInfo)) {
      toast.error('No changes detected');
      return;
    }

    // handle form submission
    const { profilePicture, firstName, lastName, email } = data;
    console.log(profilePicture);
    saveProfileInformation(profilePicture, firstName, lastName, email);
    console.log('Profile data:', data);
    reset(); // clear form fields
  };

  if (loading) {
    return (
      <div className=''>
        <Loading />
      </div>
    );
  }

  return (
    <form
      action=''
      className='space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}>
      {/* file */}
      {fileInputField && (
        <div className='space-y-4 p-4 bg-lightestGray rounded-xl md:flex md:justify-between md:items-center gap-6 md:space-y-0'>
          <label className='text-gray text-sm xl:text-base basis-[50%]'>
            {fileInputField.label}
          </label>

          <div className='relative  h-fit  p-2'>
            <div
              className='space-y-2 overflow-hidden rounded-xl bg-cover w-[193px] md:w-[220px] aspect-square  bg-veryLightBlue grid place-content-center cursor-pointer absolut'
              style={{
                backgroundImage: previewImage ? `url(${previewImage})` : 'none',
              }}
              onClick={handleCustomUploadClick}>
              <CiImageOn className='text-blue w-fit mx-auto text-4xl' />
              <Paragraph className='text-blue mx-auto text-nowrap font-semibold'>
                {previewImage ? 'click to change' : fileInputField.placeholder}
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

      <div className='py-4 mt-1 flex md:flex-row flex-col-reverse gap-2 justify-between bg-white w-full sticky bottom-0 rounded-b-xl md:'>
        <Button className='md:w-fit' variant='danger' type='button' onClick={logout}>
          logout
        </Button>

        <Button className='md:w-fit' type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
