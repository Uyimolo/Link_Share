'use client';
import FormGroup from '@/components/forms/FormGroup';
import Paragraph from '@/components/text/Paragraph';
import { IconType } from 'react-icons';
import * as yup from 'yup';
import { FaLink } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from './Select';
import { useState } from 'react';
import { LinkCardProps } from '@/types/types';
import CustomSelect from './Select';
import { options } from '@/data/options';

type LinkCardInputData = {
  link: string;
  // title: string;
};

const validationSchema = yup.object({
  link: yup.string().url('Invalid URL').required('Address is required'),
});

const linkCardFormFields: {
  type: string;
  label: string;
  name: keyof LinkCardInputData;
  placeholder: string;
  icon: IconType;
  required: boolean;
} = {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [title, setTitle] = useState('');

  const onSubmit = (data: LinkCardInputData) => {
    const updatedLink = {
      id: link.id,
      url: data.link,
      title: title,
    };
    updateLink(updatedLink);
    // handle form submission
  };

  return (
    <div className='bg-lightestGray p-5 rounded-xl space-y-4'>
      <div className='flex justify-between'>
        <Paragraph>{`Link #${index + 1}`}</Paragraph>
        <Paragraph className='cursor-pointer' onClick={() => deleteLink(link)}>Remove</Paragraph>
      </div>

      <div className='space-y-4'>
        {/* select input */}
        <CustomSelect options={options} onSelect={setTitle} />
        {/* text input */}
        <FormGroup
          register={register('link', { onChange: handleSubmit(onSubmit) })} // handle form submission on input change
          formField={linkCardFormFields}
          error={errors.link?.message}
        />
      </div>
    </div>
  );
};

export default LinkCard;
