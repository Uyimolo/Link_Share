import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormGroup from '@/components/forms/FormGroup';
import Paragraph from '@/components/text/Paragraph';
import { IconType } from 'react-icons';
import { LinkCardProps } from '@/types/types';
import CustomSelect from './Select';
import { options } from '@/data/options';

type LinkCardInputData = {
  link: string;
};

const validationSchema = yup.object({
  link: yup.string().url('Invalid URL').required('Address is required'),
});

const linkCardFormFields = {
  type: 'text',
  label: 'Address',
  name: 'link',
  placeholder: 'Enter the address',
  icon: FaLink,
  required: true,
};

const LinkCard = ({ index, deleteLink, updateLink, link }: LinkCardProps) => {
  const {
    register,
    handleSubmit,
    setValue, // To programmatically set the value of the form field
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      link: link.url || '', // Set default value from the link prop
    },
  });

  const [title, setTitle] = useState(link.title || '');

  useEffect(() => {
    // Set the initial value for the link input when the component mounts
    setValue('link', link.url || ''); // This updates the input value with the value from the props
  }, [link, setValue]);

  const onSubmit = (data: LinkCardInputData) => {
    const updatedLink = {
      id: link.id,
      url: data.link,
      title: title,
    };
    updateLink(updatedLink);
  };

  return (
    <div className='bg-lightestGray p-5 rounded-xl space-y-4'>
      <div className='flex justify-between'>
        <Paragraph className='font-semibold'>{`Link #${index + 1}`}</Paragraph>
        <Paragraph className='cursor-pointer' onClick={() => deleteLink(link)}>
          Remove
        </Paragraph>
      </div>

      <div className='space-y-4'>
        {/* select input */}
        <div className='space-y-2'>
          <Paragraph variant='small'>Platform</Paragraph>
          <CustomSelect
            defaultValue={link.title}
            options={options}
            onSelect={setTitle}
          />
        </div>
        {/* text input */}
        <FormGroup
          register={register('link', { onChange: handleSubmit(onSubmit) })} // Submits when the link input changes
          formField={linkCardFormFields}
          error={errors.link?.message}
        />
      </div>
    </div>
  );
};

export default LinkCard;
