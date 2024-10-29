import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormGroup from '@/components/forms/FormGroup';
import Paragraph from '@/components/text/Paragraph';
import { LinkCardProps } from '@/types/types';
import CustomSelect from './Select';
import { options } from '@/data/options';
import { IconType } from 'react-icons';

// Define the type for the form input data
type LinkCardInputData = {
  link: string;
};

// Define the validation schema
const validationSchema = yup.object({
  link: yup.string().url('Invalid URL').required('Address is required'),
});

// Define the form field type
type FormField = {
  label: string;
  name: 'link' | `link.${string}`;
  type: string;
  required: boolean;
  placeholder: string;
  icon?: IconType;
};

// Initialize the form fields with the correct type
const linkCardFormFields: FormField = {
  type: 'text',
  label: 'Address',
  name: 'link', // Valid name as per the defined type
  placeholder: 'Enter the address',
  icon: FaLink,
  required: true,
};

const LinkCard = ({ index, deleteLink, updateLink, link }: LinkCardProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LinkCardInputData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      link: link.url || '',
    },
  });

  // State for title field, allowing platform selection via CustomSelect component
  const [title, setTitle] = useState(link.title || '');

  // Update URL input field whenever `link` prop changes (sync with external data) making the input a controlled input
  useEffect(() => {
    setValue('link', link.url || '');
  }, [link, setValue]);

  // Submits the updated URL and title to parent component on form submission
  // Used to save changes in the URL and title fields to parent state in the dashboard
  const onSubmit = (data: LinkCardInputData) => {
    const updatedLink = {
      id: link.id,
      url: data.link,
      title: title,
    };
    updateLink(updatedLink);
  };

  // Updates title (platform) state and syncs changes with parent component
  // if link input has no validation error, keeping platform selection current
  const handleTitleChange = (selectedTitle: string) => {
    setTitle(selectedTitle);

    if (!errors.link) {
      const updatedLink = {
        id: link.id,
        url: link.url,
        title: selectedTitle,
      };
      updateLink(updatedLink);
    }
  };

  return (
    <div className='bg-lightestGray p-5 rounded-xl space-y-4'>
      {/* Header: displays link index and delete option */}
      <div className='flex justify-between'>
        <Paragraph className='font-semibold'>{`Link #${index + 1}`}</Paragraph>

        <Paragraph
          className='cursor-pointer hover:text-blue'
          onClick={() => deleteLink(link)}>
          Remove
        </Paragraph>
      </div>

      <div className='space-y-4'>
        {/* Platform Selection: uses CustomSelect for title field */}
        <div className='space-y-2'>
          <Paragraph variant='small'>Platform</Paragraph>
          <CustomSelect
            defaultValue={link.title}
            options={options}
            onSelect={handleTitleChange}
          />
        </div>

        {/* URL Input: with validation error messaging */}
        <FormGroup
          register={register('link', { onChange: handleSubmit(onSubmit) })}
          formField={linkCardFormFields}
          error={errors.link?.message}
        />
      </div>
    </div>
  );
};

export default LinkCard;
